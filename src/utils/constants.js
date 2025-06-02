/* eslint-disable no-undef */

let apiRoot = "";

if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:5000";
}
if (process.env.BUILD_MODE === "production") {
  // apiRoot = "https://trello-backend-c8qp.onrender.com";
  apiRoot = "https://trello-backend-c8qp.onrender.com";
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 12;

export const API_ROOT = apiRoot;

export const BOARD_INVITATION_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

export const CARD_MEMBER_ACTIONS = {
  REMOVE: "REMOVE",
  ADD: "ADD",
};

// sau này nền dùng import.meta.env cho tiện, dùng process cần cấu hình ở vite config
