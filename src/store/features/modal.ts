import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modalIsOpen: boolean;
}
const initialState: ModalState = {
  modalIsOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, name) => {
      console.log('modal store slice ', name)
      state.modalIsOpen = true
    },
    closeModal: (state) => {
      state.modalIsOpen = false
    }
  },
});


export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer;
