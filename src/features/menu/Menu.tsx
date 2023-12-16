import Konva from 'konva';
import { RefObject } from 'react';
import { useRecoilState } from 'recoil';

import { menuState } from '@/store/canvasStore';

import { WindowContainer } from '@/ui/containers';

import {
  Background,
  Decoration,
  Image,
  MenuList,
  Pen,
  Save,
} from './components';

interface MenuProps {
  stageRef: RefObject<Konva.Stage>;
}

const Menu = ({ stageRef }: MenuProps) => {
  const [menu, setMenu] = useRecoilState(menuState);

  return (
    <WindowContainer className="min-h-[400px] w-[350px] bg-white sm:h-[400px] sm:w-[600px] xl:h-2/3 ">
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
