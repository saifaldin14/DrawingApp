import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { endStroke } from "../actions";

const initialState: RootState['strokes'] = []

const strokes = createSlice({
  name: 'strokes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { historyLimit, stroke } = action.payload
      if (historyLimit === 0) state.push(stroke)
      else state.splice(-historyLimit, historyLimit, stroke)
    })
  }
})

export default strokes.reducer
