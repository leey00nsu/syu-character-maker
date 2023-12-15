import { useRecoilState } from 'recoil';

import { menuState, modeState } from '@/store/canvasStore';

import { MENUS } from '../../constants/menus';
import MenuItem from './MenuItem';

const MenuList = () => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);

  const changeMenuHandler = (changes: string) => {
    setMenu(changes);
    setMode('move');
  };

  return (
    <ul className="menu rounded-box menu-horizontal w-full  gap-1 bg-base-100 ">
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
