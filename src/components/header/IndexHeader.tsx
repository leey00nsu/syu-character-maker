import {
  FaExpandArrowsAlt,
  FaPencilAlt,
  FaQuestion,
  FaRedoAlt,
  FaTrashAlt,
  FaUndoAlt,
} from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import useHistoryControll from '../../hooks/useHistoryControll';
import useObjectControll from '../../hooks/useObjectControll';
import {
  drawingObjectState,
  modeState,
  selectedIdState,
} from '../../store/store';
import HeaderActiveButton from './buttons/HeaderActiveButton';
import HeaderRemoveButton from './buttons/HeaderRemoveButton';
import HeaderToggleButton from './buttons/HeaderToggleButton';
import { useNavigate } from 'react-router-dom';
import HeaderContainer from './HeaderContainer';

const IndexHeader = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useRecoilState(modeState);
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

  const changePageHandler = (changes: string) => {
    if (changes === 'about') navigate('/about');
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
    <HeaderContainer>
      <HeaderContainer.Left>
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
      </HeaderContainer.Left>

      <HeaderContainer.Right>
        <HeaderActiveButton mode="about" onClick={changePageHandler}>
          <FaQuestion className="h-full w-full" />
        </HeaderActiveButton>
      </HeaderContainer.Right>
    </HeaderContainer>
  );
};

export default IndexHeader;
