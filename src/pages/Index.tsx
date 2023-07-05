import Header from "../components/ui/Header";
import Preview from "../components/Preview";
import Menu from "../components/ui/Menu";
import { objectState, selectedIdState, modeState } from "../store/store";
import { useRecoilState } from "recoil";
import { useRef } from "react";
const Index = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [objects, setObjects] = useRecoilState(objectState);

  const clickLayerHandler = (selectedId: string) => {
    setSelectedId([selectedId]);
    setMode("move");
  };

  const stageRef = useRef<any>(null);
  return (
    <div className="flex flex-col w-screen h-screen ">
      <Header />
      <div className="flex w-full">
        <div className="flex flex-col items-center w-2/3 h-full max-w-4xl gap-2">
          <Preview stageRef={stageRef} />
          <Menu stageRef={stageRef} />
        </div>
        <div className="mockup-window border border-base-300  w-[200px] max-h-[400px] bg-white shrink-0">
          <p className=" absolute top-[14px] left-2/4">레이어</p>
          <div className="py-2 h-full flex flex-col overflow-y-auto">
            {objects.map((object) => (
              <p
                className={selectedId.includes(object.id) ? " bg-blue-400" : ""}
                onClick={() => clickLayerHandler(object.id)}
                key={object.id}
              >
                {object.id}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
