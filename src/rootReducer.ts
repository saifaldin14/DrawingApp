import { RootState } from "./types";
import { Action, BEGIN_STROKE } from "./actions";

const initialState: RootState = {
  currentStroke: { points: [], color: "#000" },
  strokes: [],
  historyIndex: 0,
};
export const rootReducer = (
  state: RootState = initialState,
  action: Action
) => {
  switch (action.type) {
    case BEGIN_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload],
        },
      };
    }
    default:
      return state;
  }
};
