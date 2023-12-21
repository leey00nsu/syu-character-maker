import Konva from 'konva';
import { RefObject, useState } from 'react';

import { WindowContainer } from '@/ui/containers';

import {
  Background,
  Decoration,
  AddImage,
  MenuList,
  Pen,
  Save,
} from './components';

interface MenuProps {
  stageRef: RefObject<Konva.Stage>;
}

const Menu = ({ stageRef }: MenuProps) => {
  const [menu, setMenu] = useState('꾸미기');

  const changeMenuHandler = (changes: string) => {
    setMenu(changes);
  };

  return (
    <WindowContainer className="min-h-[400px] w-[350px] bg-white sm:h-[400px] sm:w-[600px] xl:h-2/3 ">
      <WindowContainer.Header>메뉴</WindowContainer.Header>
      <MenuList menu={menu} changeMenuHandler={changeMenuHandler} />
      {menu === '꾸미기' && <Decoration />}
      {menu === '배경' && <Background />}
      {menu === '이미지' && <AddImage />}
      {menu === '펜' && <Pen />}
      {menu === '저장' && <Save stageRef={stageRef} />}
    </WindowContainer>
  );
};

export default Menu;
