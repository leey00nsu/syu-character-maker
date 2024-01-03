import { Menus } from '../../constants/menus';

interface MenuItemProps {
  menuName: Menus;
  menu: string;
  changeMenuHandler: (changes: Menus) => void;
}

const MenuItem = ({ menu, menuName, changeMenuHandler }: MenuItemProps) => {
  return (
    <li className="flex grow">
      <div
        onClick={changeMenuHandler.bind(this, menuName)}
        className={
          menu == menuName ? 'active justify-center' : 'justify-center'
        }
      >
        {menuName}
      </div>
    </li>
  );
};

export default MenuItem;
