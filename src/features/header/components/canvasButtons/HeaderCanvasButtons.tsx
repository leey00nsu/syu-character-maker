import {
  HeaderDrawButton,
  HeaderMoveButton,
  HeaderRedoButton,
  HeaderRemoveButton,
  HeaderUndoButton,
} from '../buttons';

const HeaderCanvasButtons = () => {
  return (
    <>
      <HeaderDrawButton />
      <HeaderMoveButton />
      <HeaderUndoButton />
      <HeaderRedoButton />
      <HeaderRemoveButton />
    </>
  );
};

export default HeaderCanvasButtons;
