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
import { MENUS, Menus } from './constants/menus';

const Menu = () => {
  const [menu, setMenu] = useState(MENUS[0]);

  const changeMenuHandler = (changes: Menus) => {
    setMenu(changes);
  };

  const renderMenuContent = () => {
    switch (menu) {
      case '꾸미기':
        return <Decoration />;
      case '배경':
        return <Background />;
      case '이미지':
        return <AddImage />;
      case '펜':
        return <Pen />;
      case '저장':
        return <Save />;
    }
  };

  return (
    <WindowContainer className="min-h-[400px] w-[350px] bg-white sm:min-h-[400px] sm:w-[600px]  ">
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

      <WindowContainer.Content className="flex grow flex-col">
        <MenuList menu={menu} changeMenuHandler={changeMenuHandler} />
        {renderMenuContent()}
      </WindowContainer.Content>
    </WindowContainer>
  );
};

export default Menu;
