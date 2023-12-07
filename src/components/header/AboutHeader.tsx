import HeaderContainer from './HeaderContainer';
import HeaderAboutButton from './buttons/HeaderAboutButton';
import HeaderAuthButton from './buttons/HeaderAuthButton';
import HeaderBackButton from './buttons/HeaderBackButton';

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
