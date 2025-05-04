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

export const UpdateBoardDetailAPI = async (boardId, updateData) => {
  console.log("boarID FE", boardId);
  const response = await request.put(`/v1/boards/${boardId}`, updateData);
  return response.data;
};

export const UpdateColumnDetailAPI = async (columnId, updateData) => {
  const response = await request.put(`/v1/columns/${columnId}`, updateData);
  return response.data;
};

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await request.put(
    `/v1/boards/supports/moving_card`,
    updateData
  );
  return response.data;
};

export const deleteColumnDetailAPI = async (columnId) => {
  const response = await request.delete(`/v1/columns/${columnId}`);
  return response.data;
};
