import { useState } from "react";
import Header from "../components/ui/Header";
import Preview from "../components/Preview";
import { FaPencilAlt, FaExpandArrowsAlt } from "react-icons/fa";

const Index = () => {
  const [mode, setMode] = useState("move");

  const changeModeHandler = (changes: string) => {
    console.log(changes);
    setMode(changes);
  };

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="flex flex-col items-center w-full h-full max-w-4xl">
        <Header />
        <Preview mode={mode} />
        <FaPencilAlt onClick={changeModeHandler.bind(this, "draw")} size={40} />
        <FaExpandArrowsAlt
          onClick={changeModeHandler.bind(this, "move")}
          size={40}
        />
        <div>{mode}</div>
      </div>
    </div>
  );
};

export default Index;
