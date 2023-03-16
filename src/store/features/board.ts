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
    initialboard: (state, action) => {
      return { ...state, ...action.payload };
    },
    addColumns: (state, action) => {
      state.columns.push(action.payload);
    },
    addColumnsOrder: (state, action) => {
      state.columnsOrder.push(action.payload);
    },
  },
});

export const { initialboard, addColumns, addColumnsOrder } = boardSlice.actions;

export const board = (state: RootState) => state.board;

export default boardSlice.reducer;
