import Header from '../components/header/Header';
import Preview from '../components/preview/Preview';
import Menu from '../components/menu/Menu';
import DrawLayer from '../components/drawLayer/DrawLayer';
import { useRef } from 'react';

const Index = () => {
  // canvas의 정보를 가져오기 위한 ref
  const stageRef = useRef<HTMLCanvasElement>(null);
  return (
    <div className="flex h-screen w-screen flex-col ">
      <Header />
      <div className="flex h-screen max-h-screen w-full flex-col pt-24 xl:flex-row">
        <div className="flex  h-full w-full shrink-0 items-center justify-center xl:w-1/2  ">
          <Preview stageRef={stageRef} />
        </div>
        <div className="flex h-full w-full flex-col items-center gap-3 p-4 xl:w-1/2">
          <Menu stageRef={stageRef} />
          <DrawLayer />
        </div>
      </div>
    </div>
  );
};

export default Index;
