import MenuContentContainer from '../containers/MenuContentContainer';
import PenColor from './PenColor';
import PenSize from './PenSize';

const Pen = () => {
  return (
    <MenuContentContainer>
      <MenuContentContainer.Column>
        <MenuContentContainer.Header>펜 크기</MenuContentContainer.Header>
        <PenSize />
      </MenuContentContainer.Column>

      <MenuContentContainer.Column>
        <MenuContentContainer.Header>펜 색</MenuContentContainer.Header>
        <PenColor />
      </MenuContentContainer.Column>
    </MenuContentContainer>
  );
};

export default Pen;
