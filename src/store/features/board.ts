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
  title: string;
  columns: Column[];
  columnsOrder: string[];
}

const initialState: BoardState = {
  title: "",
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
    updateTitle: (state, action) => {
      state.title = action.payload;
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
      const index = state.columns.findIndex(
        (col) => col._id === action.payload.colId
      );
      state.columns[index].tasksOrder.unshift(action.payload.task._id);
      state.columns[index].tasks.unshift(action.payload.task);
    },
    updateTask: (state, action) => {
      state.columns.forEach((column) => {
        const index = column.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        console.log(index, action);
        if (index !== -1) column.tasks.splice(index, 1, action.payload);
      });
    },
    removeTask: (state, action) => {
      console.log(action);
      state.columns.forEach((col) => {
        const indx = col.tasksOrder.findIndex((id) => id === action.payload);
        if (indx !== -1) {
          col.tasksOrder.splice(indx, 1);
          col.tasks.splice(indx, 1);
        }
      });
    },
    moveColumn: (state, action) => {
      state.columnsOrder.splice(action.payload.sourceIndex, 1);
      state.columnsOrder.splice(
        action.payload.destinationIndex,
        0,
        action.payload.draggableId
      );

      const src = state.columns.splice(action.payload.sourceIndex, 1)[0];
      state.columns.splice(action.payload.destinationIndex, 0, src);
    },
    reorderTask: (state, action) => {
      const index = state.columns.findIndex((col) => {
        const index = col.tasksOrder.findIndex(
          (task) => task === action.payload.draggableId
        );
        if (index !== -1) return true;
      });

      let src = state.columns[index].tasks.splice(
        action.payload.sourceIndex,
        1
      )[0];
      state.columns[index].tasks.splice(
        action.payload.destinationIndex,
        0,
        src
      );

      src = state.columns[index].tasksOrder.splice(
        action.payload.sourceIndex,
        1
      )[0];
      state.columns[index].tasksOrder.splice(
        action.payload.destinationIndex,
        0,
        src
      );
    },
  },
});

export const {
  initialboard,
  updateTitle,
  addColumns,
  addColumnsOrder,
  removeFromColumns,
  removeFromColumnsOrder,
  updateColumns,
  addTasks,
  updateTask,
  removeTask,
  moveColumn,
  moveTask,
} = boardSlice.actions;

export const board = (state: RootState) => state.board;

export default boardSlice.reducer;
