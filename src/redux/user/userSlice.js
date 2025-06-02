import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authorizeAxiosInstance from "~/utils/authorizeAxios";

const initialState = {
  currentUser: null,
};

export const loginUserAPI = createAsyncThunk(
  "user/loginUserAPI",
  async (data) => {
    const reponse = await authorizeAxiosInstance.post("/v1/users/login", data);
    return reponse.data;
  }
);

export const logoutUserAPI = createAsyncThunk(
  "user/logoutUserAPI",
  async (showSuccessMessage = true) => {
    const response = await authorizeAxiosInstance.delete("/v1/users/logout");
    if (showSuccessMessage) {
      toast.success("Logged out sucessfully");
    }
    return response.data;
  }
);

export const updateAPI = createAsyncThunk("user/update", async (data) => {
  const response = await authorizeAxiosInstance.put("/v1/users/update", data);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      const user = action.payload;
      state.currentUser = user;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload;
      state.currentUser = user;
    });
    // Api sau khi logout thành công sẽ clear thông tin user về null
    // Kết hợp cùng với ProtectedRoute ở App.js sẽ điều hướng về trang login
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null;
    });

    builder.addCase(updateAPI.fulfilled, (state, action) => {
      const user = action.payload;
      state.currentUser = user;
    });
  },
});

export const { updateCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

export const userReducer = userSlice.reducer;
