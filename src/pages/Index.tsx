import Header from "../components/header/Header";
import Preview from "../components/preview/Preview";
import Menu from "../components/menu/Menu";
import DrawLayer from "../components/drawLayer/DrawLayer";
import { useRef } from "react";

const Index = () => {
  // canvas의 정보를 가져오기 위한 ref
  const stageRef = useRef<any>(null);
  return (
    <div className="flex flex-col w-screen h-screen ">
      <Header />
      <div className="flex w-full">
        <div className="flex flex-col items-center w-2/3 h-full max-w-4xl gap-2">
          <Preview stageRef={stageRef} />
          <Menu stageRef={stageRef} />
        </div>
        <DrawLayer />
      </div>
    </div>
  );
};

export default Index;
