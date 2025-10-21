import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "../slices/stockSlice";
import stockEntryReducer from "../slices/stockEntrySlice";

export const store = configureStore({
  reducer: {
    stocks: stockReducer,
    stockEntry: stockEntryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
