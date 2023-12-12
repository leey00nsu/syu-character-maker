import HeaderContainer from './HeaderContainer';
import {
  HeaderBackButton,
  HeaderAuthButton,
  HeaderAboutButton,
} from './buttons';

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
