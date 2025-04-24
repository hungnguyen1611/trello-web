import { Stack } from "@mui/material";
import { CardItem } from "./Card/Card";
import PropTypes from "prop-types";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const ListCards = ({ cards }) => {
  return (
    <SortableContext
      items={cards.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Stack
        sx={{
          gap: 0.7,
          p: "0 7px 7px 7px",
          m: "0 5px",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardBarContent} - ${theme.spacing(3.5)} - ${
              theme.trello.columnHeaderHeight
            } - ${theme.trello.columnFooterHeight}) `,
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
            borderRadius: "0.5rem",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf",
          },
        }}
      >
        {cards.map((card) => (
          <CardItem card={card} key={card._id} />
        ))}
      </Stack>
    </SortableContext>
  );
};

ListCards.propTypes = {
  cards: PropTypes.array,
};
