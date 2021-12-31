import { configureStore, combineReducers } from "@reduxjs/toolkit";
import currentStroke from "../slice/current";
import historyIndex from "../slice/history";
import strokes from "../slice/strokes";

export const store = configureStore({
  reducer: combineReducers({ currentStroke, historyIndex, strokes }),
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()]
})