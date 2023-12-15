import {
  HeaderAboutButton,
  HeaderAuthButton,
  HeaderBackButton,
} from './components/buttons';
import { HeaderContainer } from './components/containers';

const AboutHeader = () => {
  return (
    <HeaderContainer>
      <HeaderContainer.Left>
        <HeaderBackButton />
      </HeaderContainer.Left>

      <HeaderContainer.Right>
        <HeaderAuthButton />
        <HeaderAboutButton />
      </HeaderContainer.Right>
    </HeaderContainer>
  );
};

export default AboutHeader;
