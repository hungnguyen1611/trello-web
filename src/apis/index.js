// interCeptor bắt lỗi tập chung

import { toast } from "react-toastify";
import authorizeAxiosInstance from "~/utils/authorizeAxios";

// Đã move vào Redux
// export const fetchBoardDetailAPI = async (boardId) => {
//   const response = await authorizeAxiosInstance.get(`/v1/boards/${boardId}`);
//   return response.data;
// };

export const createNewColumnApi = async (newColumn) => {
  const response = await authorizeAxiosInstance.post("/v1/columns", newColumn);
  return response.data;
};

export const createNewCardApi = async (newCard) => {
  const response = await authorizeAxiosInstance.post("/v1/cards", newCard);
  return response.data;
};

export const UpdateBoardDetailAPI = async (boardId, updateData) => {
  const response = await authorizeAxiosInstance.put(
    `/v1/boards/${boardId}`,
    updateData
  );
  return response.data;
};

export const UpdateColumnDetailAPI = async (columnId, updateData) => {
  const response = await authorizeAxiosInstance.put(
    `/v1/columns/${columnId}`,
    updateData
  );
  return response.data;
};

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await authorizeAxiosInstance.put(
    `/v1/boards/supports/moving_card`,
    updateData
  );
  return response.data;
};

export const deleteColumnDetailAPI = async (columnId) => {
  const response = await authorizeAxiosInstance.delete(
    `/v1/columns/${columnId}`
  );
  return response.data;
};

export const registerUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `/v1/users/register`,
    data
  );
  toast.success(
    "Account created successfully? Please check and verify your account before login!",
    {
      theme: "colored",
    }
  );

  return response.data;
};

export const verifyUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.put(`/v1/users/verify`, data);
  toast.success(
    "Account verified successfully! Now you can login to enjoy our services! Have a good",
    {
      theme: "colored",
    }
  );
  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosInstance.get("/v1/users/refresh_token");
  return response.data;
};
