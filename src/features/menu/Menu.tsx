import { useState } from 'react';

import { WindowContainer } from '@/ui/containers';
import { Paragraph } from '@/ui/texts';

import {
  AddImage,
  Background,
  Decoration,
  MenuList,
  Pen,
  Save,
} from './components';

const Menu = () => {
  const [menu, setMenu] = useState('꾸미기');

  const changeMenuHandler = (changes: string) => {
    setMenu(changes);
  };

  return (
    <WindowContainer className="min-h-[400px] w-[350px] bg-white sm:h-[400px] sm:w-[600px] xl:h-2/3 ">
      <WindowContainer.Header>
        <Paragraph
          className="translate-y-1"
          size="md"
          weight="medium"
          ellipsis
          fixSize
        >
          메뉴
        </Paragraph>
      </WindowContainer.Header>
      <MenuList menu={menu} changeMenuHandler={changeMenuHandler} />
      {menu === '꾸미기' && <Decoration />}
      {menu === '배경' && <Background />}
      {menu === '이미지' && <AddImage />}
      {menu === '펜' && <Pen />}
      {menu === '저장' && <Save />}
    </WindowContainer>
  );
};

export default Menu;
