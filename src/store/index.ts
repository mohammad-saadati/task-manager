import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/board";
import modalReducer from "./features/modal";
import currentUser from "./features/currentUser";
//
import { thunks } from "./thunks";

const store = configureStore({
  reducer: {
    board: boardReducer,
    modal: modalReducer,
    currentUser: currentUser,
    // 
    [thunks.reducerPath]: thunks.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunks.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
