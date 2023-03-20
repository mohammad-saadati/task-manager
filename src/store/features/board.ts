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
        return col._id === action.payload;
      });
      state.columns.splice(index, 1);
    },
    removeFromColumnsOrder: (state, action) => {
      state.columnsOrder.push(action.payload);
    },
    updateColumns: (state, action) => {
      const index = state.columns.findIndex(
        (col) => col._id === action.payload._id
      );
      state.columns.splice(index, 1, action.payload);
    },
    addTasks: (state, action) => {
      console.log("addTasks", action);
      // state.columns.tasksOrder.push(action.payload);
      const index = state.columns.findIndex(col => col._id === action.payload.colId)
      state.columns[index].tasksOrder.unshift(action.payload.task._id)
      state.columns[index].tasks.unshift(action.payload.task)
    },
    // addTasksOrder: (state, action) => {
    //   state.columns.push(action.payload);
    // },
    updateTask: (state, action) => {},
    removeTask: (state, action) => {
      state.columns.forEach((col) => {
        const indx = col.tasksOrder.findIndex((id) => id === action.payload);
        col.tasksOrder.splice(indx, 1);
        col.tasks.splice(indx, 1);
      });
    },
  },
});

export const {
  initialboard,
  addColumns,
  addColumnsOrder,
  removeFromColumns,
  removeFromColumnsOrder,
  updateColumns,
  // addTasksOrder,
  addTasks,
  updateTask,
  removeTask,
} = boardSlice.actions;

export const board = (state: RootState) => state.board;

export default boardSlice.reducer;
