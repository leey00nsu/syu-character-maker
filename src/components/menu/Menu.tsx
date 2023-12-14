import { menuState } from '@/store/store';
import Konva from 'konva';
import { RefObject } from 'react';
import { useRecoilState } from 'recoil';
import MenuList from './MenuList';
import Pen from './Pen/Pen';
import Background from './background/Background';
import Decoration from './decoration/Decoration';
import Image from './image/Image';
import Save from './save/Save';

interface MenuProps {
  stageRef: RefObject<Konva.Stage>;
}

const Menu = ({ stageRef }: MenuProps) => {
  const [menu, setMenu] = useRecoilState(menuState);

  return (
    <div className="xl:max-h-2/3 mockup-window flex min-h-[300px] w-[360px] shrink-0 flex-col border border-base-300 bg-white sm:h-[400px] sm:w-[600px] xl:h-2/3">
      <MenuList />
      {menu === '꾸미기' && <Decoration />}
      {menu === '배경' && <Background />}
      {menu === '이미지' && <Image />}
      {menu === '펜' && <Pen />}
      {menu === '저장' && <Save stageRef={stageRef} />}
    </div>
  );
};

export default Menu;
