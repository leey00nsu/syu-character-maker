import Header from "../components/header/Header";
import Preview from "../components/preview/Preview";
import Menu from "../components/menu/Menu";
import DrawLayer from "../components/drawLayer/DrawLayer";
import { useRef } from "react";

const Index = () => {
  // canvas의 정보를 가져오기 위한 ref
  const stageRef = useRef<HTMLCanvasElement>(null);
  return (
    <div className="flex flex-col w-screen h-screen ">
      <Header />
      <div className="flex flex-col xl:flex-row w-full h-screen max-h-screen pt-24">
        <div className="flex  justify-center items-center w-full xl:w-1/2 h-full shrink-0  ">
          <Preview stageRef={stageRef} />
        </div>
        <div className="flex flex-col w-full xl:w-1/2 h-full items-center gap-3 p-4">
          <Menu stageRef={stageRef} />
          <DrawLayer />
        </div>
      </div>
    </div>
  );
};

export default Index;
