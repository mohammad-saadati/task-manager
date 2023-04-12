import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modalIsOpen: boolean;
  data: null;
}
const initialState: ModalState = {
  modalIsOpen: false,
  data: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalIsOpen = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
