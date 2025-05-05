import { useContext } from "react";
import BoardContext from "./BoardContext";

const useSelectBoard = () => {
  return useContext(BoardContext);
};

export default useSelectBoard;
