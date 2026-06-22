import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("daraz_user"));
const storedUsers = JSON.parse(localStorage.getItem("daraz_users")) || [];

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    isLoggedIn: !!storedUser,
    darazUsers: storedUsers, 
  },
  reducers: {
    signup: (state, action) => {
      state.darazUsers.push(action.payload); 
      localStorage.setItem("daraz_users", JSON.stringify(state.darazUsers));
    },

    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("daraz_user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("daraz_user");
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
