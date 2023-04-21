import { useState } from "react";
import Header from "../components/ui/Header";
import Preview from "../components/Preview";
import { FaPencilAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { SketchPicker, ColorResult } from "react-color";

const Index = () => {
  const [mode, setMode] = useState("move");
  const [color, setColor] = useState("#ffffff");

  const changeColorHandler = (color: ColorResult) => {
    setColor(color.hex);
  };

  const changeModeHandler = (changes: string) => {
    console.log(changes);
    setMode(changes);
  };

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="flex flex-col items-center w-full h-full max-w-4xl">
        <Header />
        <Preview mode={mode} bgColor={color} />
        <input
          type="file"
          className="shrink-0 file-input file-input-bordered file-input-success w-full max-w-xs"
        />

        <FaPencilAlt
          className=" shrink-0"
          onClick={changeModeHandler.bind(this, "draw")}
          size={40}
        />
        <FaExpandArrowsAlt
          className=" shrink-0"
          onClick={changeModeHandler.bind(this, "move")}
          size={40}
        />
        <SketchPicker
          color={color}
          onChange={changeColorHandler}
          onChangeComplete={() => console.log(color)}
        />
      </div>
    </div>
  );
};

export default Index;
