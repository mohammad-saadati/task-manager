import { createSlice } from "@reduxjs/toolkit";

interface DrawerState {
  drawerIsOpen: boolean;
  drawerWidth: number
}
const initialState: DrawerState = {
  drawerIsOpen: false,
  drawerWidth: 250
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawerIsOpen = true
    },
    closeDrawer: (state) => {
      state.drawerIsOpen = false
    }
  },
});


export const { openDrawer, closeDrawer } = drawerSlice.actions

export default drawerSlice.reducer;
