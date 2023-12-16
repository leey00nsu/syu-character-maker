import { HeaderCanvasButtons } from './components';
import {
  HeaderAboutButton,
  HeaderAuthButton,
  HeaderBackButton,
  HeaderGalleryButton,
} from './components/buttons';
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
        <HeaderGalleryButton />
        <HeaderAuthButton />
        <HeaderAboutButton />
      </HeaderContainer.Right>
    </HeaderContainer>
  );
};

export default Header;
