import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "../slice/history"
import { strokesLengthSelector } from "../selectors";

export const EditPanel = (): JSX.Element => {
  const dispatch = useDispatch()
  const limit = useSelector(strokesLengthSelector)

  return (
    <div className="window edit">
      <div className="title-bar">
        <div className="title-bar-text">Edit</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button
            className="button redo"
            onClick={() => dispatch(undo(limit))}
          >
            Undo
          </button>
          <button
            className="button undo"
            onClick={() => dispatch(redo())}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  )
}