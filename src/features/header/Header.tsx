import { HeaderCanvasButtons } from './components';
import {
  HeaderAboutButton,
  HeaderAuthButton,
  HeaderBackButton,
} from './components/buttons';
import HeaderBoardButton from './components/buttons/HeaderBoardButton';
import { HeaderContainer } from './components/containers';

interface HeaderProps {
  isCanvas?: boolean;
}

const Header = ({ isCanvas }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderContainer.Left>
        {isCanvas && <HeaderCanvasButtons />}
        {!isCanvas && <HeaderBackButton />}
      </HeaderContainer.Left>

      <HeaderContainer.Right>
        <HeaderBoardButton />
        <HeaderAuthButton />
        <HeaderAboutButton />
      </HeaderContainer.Right>
    </HeaderContainer>
  );
};

export default Header;
