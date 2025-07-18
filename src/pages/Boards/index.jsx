import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
// Grid: https://mui.com/material-ui/react-grid2/#whats-changed
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import randomColor from "randomcolor";
import { Link, useLocation } from "react-router-dom";
import SidebarCreateBoardModal from "./create";

import { Container } from "@mui/material";
import { fetchBoardsAPI } from "~/apis";
import Layout from "~/components/LayOut/Layout";
import { Loading } from "~/components/Loading/Loading";
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from "~/utils/constants";
import { capitalizeFirstLetter } from "~/utils/formatters";
// import { useAuth0 } from "@auth0/auth0-react";
// Styles của mấy cái Sidebar item menu, anh gom lại ra đây cho gọn.

function Boards() {
  // Số lượng bản ghi boards hiển thị tối đa trên 1 page tùy dự án (thường sẽ là 12 cái)
  const [boards, setBoards] = useState(null);
  // Tổng toàn bộ số lượng bản ghi boards có trong Database mà phía BE trả về để FE dùng tính toán phân trang
  const [totalBoards, setTotalBoards] = useState(null);

  // Xử lý phân trang từ url với MUI: https://mui.com/material-ui/react-pagination/#router-integration
  const location = useLocation();

  // const { isAuthenticated } = useAuth0();

  /**
   * Parse chuỗi string search trong location về đối tượng URLSearchParams trong JavaScript
   * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
   */
  const query = new URLSearchParams(location.search);
  /**
   * Lấy giá trị page từ query, default sẽ là 1 nếu không tồn tại page từ url.
   * Nhắc lại kiến thức cơ bản hàm parseInt cần tham số thứ 2 là Hệ thập phân (hệ đếm cơ số 10) để đảm bảo chuẩn số cho phân trang
   */
  const page = parseInt(query.get("page") || "1", 10);

  const updateStateData = (res) => {
    setBoards(res.boards || []);
    setTotalBoards(res.totalBoards || 0);
  };

  const afterCreateNewBoard = () => {
    fetchBoardsAPI(location.search).then(updateStateData);
  };

  useEffect(() => {
    // Fake tạm 16 cái item thay cho boards
    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    // setBoards([...Array(16)].map((_, i) => i));
    // Fake tạm giả sử trong Database trả về có tổng 100 bản ghi boards
    // setTotalBoards(100);

    // Gọi API lấy danh sách boards ở đây...
    fetchBoardsAPI(location.search).then(updateStateData);

    // Áp dụng Auth
    // if (isAuthenticated) {
    //   fetchBoardsAPI(location.search).then(updateStateData);
    // }

    // ...
  }, [location.search]);

  // Lúc chưa tồn tại boards > đang chờ gọi api thì hiện loading
  if (!boards) {
    return <Loading caption="Loading Boards..." />;
  }
  return (
    <Layout>
      <Container>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Your boards:
        </Typography>

        {/* Trường hợp gọi API nhưng không tồn tại cái board nào trong Database trả về */}
        {boards?.length === 0 && (
          <Typography variant="span" sx={{ fontWeight: "bold", mb: 3 }}>
            No result found!
          </Typography>
        )}

        {/* Trường hợp gọi API và có boards trong Database trả về thì render danh sách boards */}
        {boards?.length > 0 && (
          <Grid container spacing={2}>
            {boards.map((b) => (
              <Grid
                sx={{
                  placeItems: "center",
                }}
                size={{ xs: 12, sm: 3, md: 4 }}
                key={b._id}
              >
                <Card sx={{ width: "250px" }}>
                  {/* Ý tưởng mở rộng về sau làm ảnh Cover cho board nhé */}
                  {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                  <Box
                    sx={{ height: "50px", backgroundColor: randomColor() }}
                  ></Box>

                  <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {b.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        fontWeight: "500",
                      }}
                    >
                      {capitalizeFirstLetter(b?.description)}
                    </Typography>
                    <Box
                      component={Link}
                      to={`/boards/${b._id}`}
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        color: "primary.main",
                        "&:hover": { color: "primary.light" },
                      }}
                    >
                      Go to board <ArrowRightIcon fontSize="small" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            <SidebarCreateBoardModal
              afterCreateNewBoard={afterCreateNewBoard}
            />
          </Grid>
        )}

        {/* Trường hợp gọi API và có totalBoards trong Database trả về thì render khu vực phân trang  */}
        {totalBoards > 0 && (
          <Box
            sx={{
              my: 3,
              pr: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Pagination
              size="large"
              color="secondary"
              // showFirstButton
              // showLastButton
              // Giá trị prop count của component Pagination là để hiển thị tổng số lượng page, công thức là lấy Tổng số lượng bản ghi chia cho số lượng bản ghi muốn hiển thị trên 1 page (ví dụ thường để 12, 24, 26, 48...vv). sau cùng là làm tròn số lên bằng hàm Math.ceil
              count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
              // Giá trị của page hiện tại đang đứng
              page={page}
              // Render các page item và đồng thời cũng là những cái link để chúng ta click chuyển trang
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/boards${
                    item.page === DEFAULT_PAGE ? "" : `?page=${item.page}`
                  }`}
                  {...item}
                />
              )}
            />
          </Box>
        )}
      </Container>
    </Layout>
  );
}

export default Boards;
