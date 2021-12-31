import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import currentStroke from "../slice/current";
import historyIndex from "../slice/history";
import strokes from "../slice/strokes";
import modalVisible from "../slice/modal";
import projectsList from "../slice/projectsList";
import { RootState } from "../types";

export const store = configureStore({
  reducer: combineReducers({
    currentStroke,
    historyIndex,
    strokes,
    modalVisible,
    projectsList,
  }),
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
