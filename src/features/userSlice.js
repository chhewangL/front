import { createSlice } from "@reduxjs/toolkit";
import { getUser, setUser } from "./localStorage";



const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    user: getUser()
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      setUser(state.user);

    }
  }
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer