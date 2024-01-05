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
      {isCanvas && (
        <HeaderContainer.ResponsiveColumn>
          <HeaderCanvasButtons />
        </HeaderContainer.ResponsiveColumn>
      )}
      {!isCanvas && (
        <HeaderContainer.FixedColumn>
          <HeaderBackButton />
        </HeaderContainer.FixedColumn>
      )}

      <HeaderContainer.FixedColumn>
        <HeaderGalleryButton />
        <HeaderAuthButton />
        <HeaderAboutButton />
      </HeaderContainer.FixedColumn>
    </HeaderContainer>
  );
};

export default Header;
