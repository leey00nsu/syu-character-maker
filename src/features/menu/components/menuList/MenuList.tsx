import { MENUS, Menus } from '../../constants/menus';
import MenuItem from './MenuItem';

interface MenuListProps {
  menu: Menus;
  changeMenuHandler: (menu: Menus) => void;
}

const MenuList = ({ menu, changeMenuHandler }: MenuListProps) => {
  return (
    <ul className="menu menu-horizontal w-full gap-1  rounded-box bg-base-100 ">
      {MENUS.map(menuName => (
        <MenuItem
          key={menuName}
          changeMenuHandler={changeMenuHandler}
          menuName={menuName}
          menu={menu}
        />
      ))}
    </ul>
  );
};

export default MenuList;
