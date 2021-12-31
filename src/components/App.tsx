import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { beginStroke, updateStroke } from '../slice/current';
import { endStroke } from '../actions';
import { strokesSelector, currentStrokeSelector, historyIndexSelector } from '../selectors';
import { clearCanvas, drawStroke } from '../utils/canvasUtils';
import { useCanvas } from './CanvasContext';
import { ColorPanel } from './ColorPanel';
import { EditPanel } from './EditPanel';
import { FilePanel } from './FilePanel';

export default function App(): JSX.Element {
  const canvasRef = useCanvas()
  const currentStroke = useSelector(currentStrokeSelector)
  const strokes = useSelector(strokesSelector)
  const historyIndex = useSelector(historyIndexSelector)
  const dispatch = useDispatch()

  const isDrawing = !!currentStroke.points.length

  const getCanvasWithContext = (canvas = canvasRef.current) => ({
    canvas,
    context: canvas?.getContext('2d'),
  })

  useEffect(() => {
    const { context } = getCanvasWithContext()
    if (!context) return

    requestAnimationFrame(() => drawStroke(context, currentStroke.points, currentStroke.color))
  }, [currentStroke])

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()
    if (!context || !canvas) return

    requestAnimationFrame(() => {
      clearCanvas(canvas)
      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color)
      })
    })
  }, [historyIndex])

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX: x, offsetY: y } = nativeEvent
    dispatch(beginStroke({ x, y }))
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({
        historyLimit: historyIndex,
        stroke: currentStroke,
      }))
    }
  }

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const { offsetX: x, offsetY: y } = nativeEvent
    dispatch(updateStroke({ x, y }))
  }

  return (
    <div className="window wrap">
      <div className="title-bar">
        <div className="title-bar-text">Redux Canvas</div>
        <div className="title-bar-controls">
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body content">
        <canvas
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseOut={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
        <section className="tools">
          <EditPanel />
          <ColorPanel />
          <FilePanel />
        </section>
      </div>
    </div>
  )
}

