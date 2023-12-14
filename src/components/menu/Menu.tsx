import { menuState } from '@/store/store';
import Konva from 'konva';
import { RefObject } from 'react';
import { useRecoilState } from 'recoil';
import MenuList from './MenuList';
import Pen from './Pen/Pen';
import Background from './background/Background';
import Decoration from './decoration/Decoration';
import Image from './image/Image';
import Save from './save/Save';
import WindowContainer from '../ui/containers/WindowContainer';

interface MenuProps {
  stageRef: RefObject<Konva.Stage>;
}

const Menu = ({ stageRef }: MenuProps) => {
  const [menu, setMenu] = useRecoilState(menuState);

  return (
    <WindowContainer className="xl:max-h-2/3 min-h-[400px] w-[350px] bg-white sm:h-[400px] sm:w-[600px] xl:h-2/3">
      <WindowContainer.Header>메뉴</WindowContainer.Header>
      <MenuList />
      {menu === '꾸미기' && <Decoration />}
      {menu === '배경' && <Background />}
      {menu === '이미지' && <Image />}
      {menu === '펜' && <Pen />}
      {menu === '저장' && <Save stageRef={stageRef} />}
    </WindowContainer>
  );
};

export default Menu;
