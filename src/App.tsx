import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return <canvas ref={canvasRef} />;
}

export default App;
