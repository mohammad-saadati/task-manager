import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export interface Task {
  id: string;
  content: string;
}
export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  tasksOrder: string[];
}
interface BoardState {
  columns: Column[];
  columnsOrder: string[];
}

const initialState: BoardState = {
  columns: [],
  columnsOrder: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initialboard: (state, payload) => {
      console.log("initialboard", payload.payload);
      state = payload.payload;
      console.log("initialboard", state);
    },
    addColumns: (state, payload) => {
      state.columns.push(payload.data);
    },
  },
});

export const { initialboard, addColumns } = boardSlice.actions;

export const board = (state: RootState) => state.board;

export default boardSlice.reducer;
