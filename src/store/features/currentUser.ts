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
    setCurrentUser: (state, payload) => {
      console.log('currentUserSlice  ', payload)
      state.currentUser = payload
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer;
