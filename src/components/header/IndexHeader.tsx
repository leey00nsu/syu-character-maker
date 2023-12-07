import HeaderContainer from './HeaderContainer';
import HeaderAboutButton from './buttons/HeaderAboutButton';
import HeaderAuthButton from './buttons/HeaderAuthButton';
import HeaderDrawButton from './buttons/HeaderDrawButton';
import HeaderMoveButton from './buttons/HeaderMoveButton';
import HeaderRedoButton from './buttons/HeaderRedoButton';
import HeaderRemoveButton from './buttons/HeaderRemoveButton';
import HeaderUndoButton from './buttons/HeaderUndoButton';

const IndexHeader = () => {
  return (
    <HeaderContainer>
      <HeaderContainer.Left>
        <HeaderDrawButton />
        <HeaderMoveButton />
        <HeaderUndoButton />
        <HeaderRedoButton />
        <HeaderRemoveButton />
      </HeaderContainer.Left>

      <HeaderContainer.Right>
        <HeaderAuthButton />
        <HeaderAboutButton />
      </HeaderContainer.Right>
    </HeaderContainer>
  );
};

export default IndexHeader;
