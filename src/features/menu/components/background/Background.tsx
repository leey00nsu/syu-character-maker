import MenuContentContainer from '../containers/MenuContentContainer';
import BackgroundCharacter from './BackgroundCharacter';
import BackgroundColor from './BackgroundColor';

const Background = () => {
  return (
    <MenuContentContainer>
      <MenuContentContainer.Column>
        <MenuContentContainer.Header>캐릭터</MenuContentContainer.Header>
        <BackgroundCharacter />
      </MenuContentContainer.Column>

      <MenuContentContainer.Column>
        <MenuContentContainer.Header>배경색</MenuContentContainer.Header>
        <BackgroundColor />
      </MenuContentContainer.Column>
    </MenuContentContainer>
  );
};

export default Background;
