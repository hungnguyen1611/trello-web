import axios from "axios";
import request from "./../utils/httpRequest";

// interCeptor bắt lỗi tập chung
export const fetchBoardDetailAPI = async (boardId) => {
  const response = await request.get(`/v1/boards/${boardId}`);
  return response.data;
};

export const createNewColumnApi = async (newColumn) => {
  const response = await request.post("/v1/columns", newColumn);
  return response.data;
};

export const createNewCardApi = async (newCard) => {
  const response = await request.post("/v1/cards", newCard);
  return response.data;
};
