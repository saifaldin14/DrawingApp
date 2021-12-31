import { RootState, Stroke } from "../types";

export const currentStrokeSelector = (state: RootState): Stroke => state.currentStroke

export const historyIndexSelector = (state: RootState): number => state.historyIndex

export const strokesSelector = (state: RootState): Stroke[] => state.strokes
export const strokesLengthSelector = (state: RootState): number => state.strokes.length