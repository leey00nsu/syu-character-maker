import MenuContentContainer from '../containers/MenuContentContainer';
import PenColor from './PenColor';
import PenMode from './PenMode';
import PenSize from './PenSize';

const Pen = () => {
  return (
    <MenuContentContainer>
      <MenuContentContainer.Column>
        <MenuContentContainer.Label>펜 크기</MenuContentContainer.Label>
        <PenMode />
        <PenSize />
      </MenuContentContainer.Column>

      <MenuContentContainer.Column>
        <MenuContentContainer.Label>펜 색</MenuContentContainer.Label>
        <PenColor />
      </MenuContentContainer.Column>
    </MenuContentContainer>
  );
};

export default Pen;
