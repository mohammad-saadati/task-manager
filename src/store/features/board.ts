import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

interface BoardState {
  columns: Array<string>;
  cards: {};
}

const initialState: BoardState = {
  columns: ['test'],
  cards: {},
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    increment: (state) => {
      state.columns.push('column-1');
    },
  },
});

export const { increment } = boardSlice.actions;

export const selectCount = (state: RootState) => state.board.cards;

export default boardSlice.reducer;
