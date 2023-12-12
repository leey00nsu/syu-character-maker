import { menuState, modeState } from '@/store/store';
import Konva from 'konva';
import { MutableRefObject } from 'react';
import { useRecoilState } from 'recoil';
import BackGround from './BackGround';
import Draw from './Draw';
import Image from './Image';
import Save from './Save';
import Items from './items/Items';

interface MenuProps {
  stageRef: MutableRefObject<Konva.Stage | null>;
}

const MENUS = ['꾸미기', '배경', '사진', '그리기', '저장'];

const Menu = ({ stageRef }: MenuProps) => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);

  const changeMenuHandler = (changes: string) => {
    setMenu(changes);
    setMode('move');
  };
  return (
    <div className="xl:max-h-2/3 mockup-window flex min-h-[300px] w-[360px] shrink-0 flex-col border border-base-300 bg-white sm:h-[400px] sm:w-[600px] xl:h-2/3">
      <ul className="menu rounded-box menu-horizontal w-full  gap-1 bg-base-100 ">
        {MENUS.map(m => (
          <li key={m} className="flex grow">
            <a
              onClick={changeMenuHandler.bind(this, m)}
              className={menu == m ? 'active justify-center' : 'justify-center'}
            >
              {m}
            </a>
          </li>
        ))}
      </ul>
      {menu === '꾸미기' && <Items />}
      {menu === '배경' && <BackGround />}
      {menu === '사진' && <Image />}
      {menu === '그리기' && <Draw />}
      {menu === '저장' && <Save stageRef={stageRef} />}
    </div>
  );
};

export default Menu;
