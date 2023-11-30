import {
  FaExpandArrowsAlt,
  FaPencilAlt,
  FaQuestion,
  FaRedoAlt,
  FaTrashAlt,
  FaUndoAlt,
} from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import useObjectControll from '../../hooks/useObjectControll';
import {
  drawingObjectHistoryIndexState,
  drawingObjectHistoryState,
  drawingObjectState,
  modeState,
  selectedIdState,
} from '../../store/store';
import HeaderActiveButton from './HeaderActiveButton';
import HeaderRemoveButton from './HeaderRemoveButton';
import HeaderToggleButton from './HeaderToggleButton';
import useHistoryControll from '../../hooks/useHistoryControll';

const Header = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [drawingObjectHistory, setDrawingObjectHistory] = useRecoilState(
    drawingObjectHistoryState,
  );
  const [drawingObjectHistoryIndex, setDrawingObjectHistoryIndex] =
    useRecoilState(drawingObjectHistoryIndexState);
  const [drawingObjects, setdrawingObjects] =
    useRecoilState(drawingObjectState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  const { undoHistory, redoHistory } = useHistoryControll();
  const { removeObject } = useObjectControll();

  const changeModeHandler = (changes: string) => {
    setMode(changes);
  };

  const changeHistoryHandler = (changes: string) => {
    if (changes === 'undo') undoHistory();
    if (changes === 'redo') redoHistory();
  };

  const changeOpacityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObject = [...drawingObjects].map(object => {
      if (object.id === selectedId[0]) {
        return {
          ...object,
          opacity: Number(e.target.value),
        };
      }
      return object;
    });
    setdrawingObjects(newObject);
  };

  const selectedObject = drawingObjects.filter(
    object => object.id === selectedId[0],
  )[0];

  return (
    <div className="fixed z-50 flex w-full items-center justify-between bg-base-100  px-6 py-6">
      <div className="flex items-center gap-2 ">
        {/* <div className="btn-ghost btn hidden text-xl normal-case sm:visible sm:flex">
          나만의 수야 수호 만들기
        </div> */}
        <div className="flex items-center justify-between gap-2">
          <HeaderToggleButton mode="draw" onClick={changeModeHandler}>
            <FaPencilAlt className="h-full w-full" />
          </HeaderToggleButton>
          <HeaderToggleButton mode="move" onClick={changeModeHandler}>
            <FaExpandArrowsAlt className="h-full w-full" />
          </HeaderToggleButton>
          <HeaderActiveButton mode="undo" onClick={changeHistoryHandler}>
            <FaUndoAlt className="h-full w-full" />
          </HeaderActiveButton>
          <HeaderActiveButton mode="redo" onClick={changeHistoryHandler}>
            <FaRedoAlt className="h-full w-full" />
          </HeaderActiveButton>
          {selectedId.length > 0 && selectedId[0] !== 'background' && (
            <HeaderRemoveButton onClick={removeObject}>
              <FaTrashAlt className="h-full w-full" />
            </HeaderRemoveButton>
          )}

          {selectedId.length === 1 && selectedId[0] !== 'background' && (
            <div className="flex flex-col items-center">
              <p>투명도</p>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={selectedObject?.opacity}
                onChange={changeOpacityHandler}
                className="range "
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        <button className="btn-ghost btn-square btn h-full">
          <FaQuestion className=" shrink-0" size={30} />
        </button>
      </div>
    </div>
  );
};

export default Header;
