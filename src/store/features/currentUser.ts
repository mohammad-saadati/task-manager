import { createSlice } from "@reduxjs/toolkit";

interface CurrentUserState {
  currentUser: {};
}
const initialState: CurrentUserState = {
  currentUser: {},
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      console.log(action.payload);
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
