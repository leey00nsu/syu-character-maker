import {
  HeaderAlphaButton,
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
      <HeaderAlphaButton />
    </>
  );
};

export default HeaderCanvasButtons;
