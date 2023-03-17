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
    removeFromColumns: (state, action) => {
      const index = state.columns.findIndex((col) => {
        // console.log('removeFromColumns', col._id, action.payload)
        return col._id === action.payload;
      });
      state.columns.splice(index, 1);
    },
    removeFromColumnsOrder: (state, action) => {
      state.columnsOrder.push(action.payload);
    },
  },
});

export const {
  initialboard,
  addColumns,
  addColumnsOrder,
  removeFromColumns,
  removeFromColumnsOrder,
} = boardSlice.actions;

export const board = (state: RootState) => state.board;

export default boardSlice.reducer;
