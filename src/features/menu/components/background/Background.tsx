import MenuContentContainer from '../containers/MenuContentContainer';
import BackgroundCharacter from './BackgroundCharacter';
import BackgroundColor from './BackgroundColor';

const Background = () => {
  return (
    <MenuContentContainer>
      <MenuContentContainer.Column>
        <MenuContentContainer.Label>캐릭터</MenuContentContainer.Label>
        <BackgroundCharacter />
      </MenuContentContainer.Column>

      <MenuContentContainer.Column>
        <MenuContentContainer.Label>배경색</MenuContentContainer.Label>
        <BackgroundColor />
      </MenuContentContainer.Column>
    </MenuContentContainer>
  );
};

export default Background;
