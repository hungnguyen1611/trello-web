import { Container } from "@mui/material";
import BoardContent from "./BoardContent/BoardContent";
import AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar";
import { mockData } from "~/apis/mock-data";
function Board() {
  return (
    <>
      <AppBar />
      <Container
        // sx={{ height: "100vh",  }}

        disableGutters
        maxWidth={false}
      >
        <BoardBar board={mockData?.board} />
        <BoardContent board={mockData?.board} />
      </Container>
    </>
  );
}

export default Board;
