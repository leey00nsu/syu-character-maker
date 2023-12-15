import {
  HeaderAboutButton,
  HeaderAuthButton,
  HeaderDrawButton,
  HeaderMoveButton,
  HeaderRedoButton,
  HeaderRemoveButton,
  HeaderUndoButton,
} from './components/buttons';
import { HeaderContainer } from './components/containers';

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
