import React from "react";
import { useDispatch } from "react-redux";
import { setStrokeColor } from "./actions";
import COLORS from "./colors";

export const ColorPanel = () => {
  const dispatch = useDispatch();

  const onColorChange = (color: string) => {
    dispatch(setStrokeColor(color));
  };
  return (
    <div className="window colors-panel">
      <div className="title-bar">
        <div className="title-bar-text">COLORS</div>
      </div>
      <div className="window-body colors">
        {COLORS.map((color: string) => (
          <div
            key={color}
            onClick={() => {
              onColorChange(color);
            }}
            className="color"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};
