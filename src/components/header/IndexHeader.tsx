import HeaderContainer from './ui/HeaderContainer';
import {
  HeaderAboutButton,
  HeaderAuthButton,
  HeaderDrawButton,
  HeaderMoveButton,
  HeaderRedoButton,
  HeaderRemoveButton,
  HeaderUndoButton,
} from './buttons';

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
