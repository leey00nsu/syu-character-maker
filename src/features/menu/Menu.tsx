import { useState } from 'react';

import { WindowContainer } from '@/ui/containers';
import { Paragraph } from '@/ui/texts';

import { MenuList } from './components';
import MenuContent from './components/menuContent/MenuContent';
import { MENUS, Menus } from './constants/menus';

const Menu = () => {
  const [menu, setMenu] = useState(MENUS[0]);

  const changeMenuHandler = (changes: Menus) => {
    setMenu(changes);
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
        <MenuContent menu={menu} />
      </WindowContainer.Content>
    </WindowContainer>
  );
};

export default Menu;
