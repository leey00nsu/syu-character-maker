import { AddImage, Background, Decoration, Pen, Save } from '..';
import { Menus } from '../../constants/menus';

const MenuContent = ({ menu }: { menu: Menus }) => {
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

export default MenuContent;
