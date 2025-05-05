import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  // MouseSensor,
  pointerWithin,
  // PointerSensor,
  // TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { cloneDeep, isEmpty } from "lodash";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { MouseSensor, TouchSensor } from "~/customLibraries/DndKitSensors";
import { generatePlaceholderCard } from "~/utils/formatters";
import { Column } from "./ListColumns/Column/Column";
import { CardItem } from "./ListColumns/Column/ListCards/Card/Card";
import { ListColumns } from "./ListColumns/ListColumns";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_CARD",
};
function BoardContent({
  board,
  createColumn,
  createCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn,
  deleteColumnDetails,
}) {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDragCard, setOldColumnWhenDragCard] = useState(null);

  // Điểm và chạm cuối cùng trước đó
  const lastOverId = useRef(null);

  //  Hàm tìm một cái column theo cardId
  const findColumnByCard = (cardId) =>
    // Lưu ý nên dùng c.card thay vì c.orderCardIds bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho card hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới
    //  Lưu ý chỗ này khi column mà ta nhận được thì card trong column đó là card chữa được sắp xếp (nên khi dùng
    // dữ liệu card trong column đó sẽ có thể gây ra một số lỗi về thứ tự sắp xếp vì xuống dưới column ta mới sáp xếp nó)
    orderedColumns.find((column) =>
      column?.cards.map((card) => card._id).includes(cardId)
    );

  //  Function chung xử lí việc cập nhật lại state trong trường hợp di chuyển card giữa các column
  const moveCardBetweenDifferentColumn = (
    overColumn,
    overDragingCardId,
    active,
    over,
    activeColumn,
    activeDragingCardId,
    activeDragingCardData,
    triggerFrom
  ) => {
    setOrderedColumns((prevColumns) => {
      // Timf vị trị overCard trong overColumn (nơi active card được thả vào)

      const overCardIndex = overColumn.cards.findIndex(
        (card) => card._id === overDragingCardId
      );
      // logic tính toán cardIndex mới trên hoặc dưới của over card( lấy từ thư viện)
      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0 ? overCardIndex + modifier : overColumn.length + 1;
      // console.log("isBelowOverItem", isBelowOverItem);
      // console.log("modifier", modifier);
      // console.log("newCardindex", newCardIndex);
      // clone mảng orderedCoumnState cũ ra môt mảng mới để xử lí ddataa rồi return cập nhật lại orderedColumn mới
      const nexColumns = cloneDeep(prevColumns);

      const nextActiveColumn = nexColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nexColumns.find(
        (column) => column._id === overColumn._id
      );
      if (nextActiveColumn) {
        // xóa card ở column active
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDragingCardId
        );

        //  Thêm placehoderCard nếu column rỗng: khi bị kéo hết đi không còn

        if (isEmpty(nextActiveColumn?.cards)) {
          // console.log("card cuối cùng bị kéo đi");
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

        //  cập nhật lại orderId cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }
      if (nextOverColumn) {
        // kiểm tra card đang kéo có tồn tại hay chưa nếu có thì xóa nó đi
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDragingCardId
        );

        //  Đối với trường hợp dragEnd thì phải cập nhật lại dữ liệu chuẩn columnId trong card sau khi kéo card giữa 2 column khác nhau

        const rebuild_activeDraggingCardData = {
          ...activeDragingCardData,
          columnId: nextOverColumn._id,
        };
        //  thêm card đang kéo vào overColumn theo vị trí index mới

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
          // activeDragItemData
        );

        //  xóa placehoderCard đi nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (c) => !c.FE_PlaceholderCard
        );
        // Cập nhật lại mảng cardOrderId cho chuẩn dữ liệu mới
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }
      /**
       * Gọi props function moveCardToDifferentColumn từ component cha cao nhất (boards/_id.jsx).
       *
       * Lưu ý: Sau này khi học MERN Stack nâng cao, mình sẽ đưa dữ liệu Board ra Redux Global Store.
       * Khi đó, API sẽ được gọi trực tiếp, tránh việc phải truyền props ngược nhiều tầng component (càng sâu càng khó quản lý).
       *
       * Việc dùng Redux giúp code sạch hơn và dễ kiểm soát hơn.
       */

      /**
       * Cần dùng activeDragItemData.columnId hoặc tốt nhất là oldColumnWhenDraggingCardId
       * (state đã được set trong bước handleDragStart) thay vì lấy từ activeData trong handleDragEnd,
       * vì sau onDragOver state đã bị cập nhật một lần rồi.
       */
      if (triggerFrom === "handleEnd") {
        moveCardToDifferentColumn(
          activeDragingCardId,
          oldColumnWhenDragCard._id,
          nextOverColumn._id,
          nexColumns
        );
      }
      return nexColumns;
    });
  };

  const handleDragStart = (e) => {
    setActiveDragItemId(e.active?.id);
    setActiveDragItemType(
      e.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );

    setActiveDragItemData(e.active?.data?.current);
    //  Nếu là kéo card thì mới thực hiện hành động setOldColumn
    if (e.active?.data?.current?.columnId) {
      setOldColumnWhenDragCard(findColumnByCard(e?.active?.id));
    }
  };

  const handleDragOver = (e) => {
    const { active, over } = e;

    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const {
      id: activeDragingCardId,
      data: { current: activeDragingCardData },
    } = active;
    const {
      id: overDragingCardId,
      // data: { current: overDragingCardData },
    } = over;

    const activeColumn = findColumnByCard(activeDragingCardId);
    const overColumn = findColumnByCard(overDragingCardId);

    //  Nếu không tồn tại 1 trong 2 column thì không cần làm gì hết để tránh crash trang web
    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumn(
        overColumn,
        overDragingCardId,
        active,
        over,
        activeColumn,
        activeDragingCardId,
        activeDragingCardData,
        "handleOver"
      );
    }
  };

  const handleDragEnd = (e) => {
    // console.log("DragEnd", e);
    const { active, over } = e;
    // Kiểm tra nếu không tồn tại over (kéo ra bên ngoài khỏi phạm vi container sẽ return luôn để tránh lỗi)
    if (!over || !active) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // Lấy vị trí cũ từ active
        const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
        // Lấy vị trí mới từ over
        const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

        const dndOrderedColumn = arrayMove(orderedColumns, oldIndex, newIndex);
        // Cập nhật lại state sau khi đã xừ lí kéo thả (vẫn gọi sau khi gọi api để tránh delay hoặc flickering giao diện)
        setOrderedColumns(dndOrderedColumn);
        // Gọi api

        moveColumns(dndOrderedColumn);
      }
    }

    // Hành động kéo thả Card Khác Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDragingCardId,
        data: { current: activeDragingCardData },
      } = active;
      const {
        id: overDragingCardId,
        // data: { current: overDragingCardData },
      } = over;

      const activeColumn = findColumnByCard(activeDragingCardId);
      const overColumn = findColumnByCard(overDragingCardId);

      //  Nếu không tồn tại 1 trong 2 column thì không cần làm gì hết để tránh crash trang web
      if (!activeColumn || !overColumn) return;

      //  Hành động kéo thả giữa 2 column khác nhau
      //  Phải dùng đến activeItemData.columnId hoặc ( set vào state từ bước handleDragStar chứ không phải activeData trong scope handDragEnd  vì sau khi đi qua onDragover tới đây là state của card đã bị cập nhật mới rồi)
      if (activeDragItemData.columnId !== overColumn._id) {
        moveCardBetweenDifferentColumn(
          overColumn,
          overDragingCardId,
          active,
          over,
          activeColumn,
          activeDragingCardId,
          activeDragingCardData,
          "handleEnd"
        );

        //  Hành động kéo thả Card ở cùng 1 column
      } else {
        // Lấy vị trí cũ từ oldColumnWhenDragCard
        const oldCardIndex = oldColumnWhenDragCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        // Lấy vị trí mới từ over
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overDragingCardId
        );

        //  Dùng arrayMove vì việc kéo card trong column tương tự như kéo column trong Board Content
        const dndOrderedCard = arrayMove(
          oldColumnWhenDragCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        const dndOrderedCardId = dndOrderedCard.map((card) => card._id);
        setOrderedColumns((prevColumns) => {
          const nexColumns = cloneDeep(prevColumns);
          //  Find trả vể tham chiếu của phần tử nó tìm thấy thỏa điều kiện nên khi thay đổi sẽ có thể thay đổi luôn cả mảng gốc
          const targetColumn = nexColumns.find((c) => c._id === overColumn._id);

          targetColumn.cards = dndOrderedCard;
          targetColumn.cardOrderIds = dndOrderedCardId;
          // Trả về giá trị state mới chuẩn vị trí
          return nexColumns;
        });

        moveCardInTheSameColumn(
          dndOrderedCardId,
          dndOrderedCard,
          oldColumnWhenDragCard._id
        );
      }
    }

    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDragCard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.7",
        },
      },
    }),
  };

  const collisionDetectionStrategy = useCallback(
    (args) => {
      // Trường hợp kéo column thì dùng thuật toán closestCorners là chuẩn nhất
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      // Tìm các điểm giao nhau va chạm intersections với con trỏ
      const pointerCollisions = pointerWithin(args);
      //  Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây
      //  Fix triệt để bug flickering của thư viện dnd-kit trong trường hợp:
      // Kéo một cái card có image cover lớn và kéo lên phía trên cùng ra khỏi khu vực kéo thả
      if (!pointerCollisions?.length) return;
      // const intersections =
      //   pointerCollisions?.length > 0
      //     ? pointerCollisions
      //     : rectIntersection(args);

      // console.log("interestions", intersections);

      // Tìm overId đầu tiên trong đám interestions trên
      // let overId = getFirstCollision(intersections, "id");
      // let overId = getFirstCollision(intersections, "id");
      let overId = getFirstCollision(pointerCollisions, "id");

      if (overId) {
        //  Nếu cái over nó là column thì sẽ tìm đến cái cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCorners hoặc
        // closestCenter đều được nhưng mà thấy dùng closestCorners thấy mượt hơn
        const checkColumn = orderedColumns.find((c) => c._id === overId);

        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];

      // Collision detection algorithms return an array of collisions
      // if (!!pointerCollisions?.length > 0 ) {
      //   return pointerCollisions;
      // }

      // If there are no collisions with the pointer, return rectangle intersections
      // return rectIntersection(args);
    },
    [activeDragItemType, orderedColumns]
  );

  // Yêu cầu chuột di chuyển 10px mới kích hoat event (fix khi click kích hoat event)
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  // const sensors = useSensors(pointerSensor);
  // Ưu tiên dùng mouse và touch để tránh bị bug kéo thả trên mobile
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    // setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
    //  set luôn board.columns ở đây vì đã chỉnh sủa sắp xếp ở board để fix bug rồi
    setOrderedColumns(board.columns);
  }, [board]);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // Thuật toán phát hiện va chạm ( nếu không có thì card với cover lớn sẽ không kéo qua coloumn được vì nó đang bị conflict giữa card và column)
      // collisionDetection={closestCorners}
      // Nếu dùng closestCorners sẽ có lỗi flickering + sai lệch dữ liệu

      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          p: "10px 0",
          height: (theme) => theme.trello.boardBarContent,
        }}
      >
        <ListColumns
          columns={orderedColumns}
          createColumn={createColumn}
          createCard={createCard}
          deleteColumnDetails={deleteColumnDetails}
        />
        <DragOverlay dropAnimation={dropAnimation}>
          {/* {!activeDragItemType && null} */}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <CardItem card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

BoardContent.propTypes = {
  board: PropTypes.shape({
    columns: PropTypes.array,
    columnOrderIds: PropTypes.array,
  }),
  createColumn: PropTypes.func,
  createCard: PropTypes.func,
  moveColumns: PropTypes.func,
  moveCardInTheSameColumn: PropTypes.func,
  moveCardToDifferentColumn: PropTypes.func,
  deleteColumnDetails: PropTypes.func,
};
export default BoardContent;
