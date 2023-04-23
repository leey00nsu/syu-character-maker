import { FaPencilAlt, FaExpandArrowsAlt, FaTrashAlt } from "react-icons/fa";
import { modeState, removeState, penState } from "../store/store";
import { useRecoilState } from "recoil";
import { CirclePicker } from "react-color";

const Draw = () => {
  const [pen, setPen] = useRecoilState(penState);
  const [mode, setMode] = useRecoilState(modeState);
  const [remove, setRemove] = useRecoilState(removeState);

  const changeModeHandler = (changes: string) => {
    setMode(changes);
  };

  const removeHandler = () => {
    setRemove(true);
  };

  const changePenSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPen({ ...pen, size: Number(e.target.value) });
  };

  const changePenColorHandler = (changes: string) => {
    console.log(changes);
    setPen({ ...pen, color: changes });
  };
  return (
    <section className="flex flex-col items-center w-full gap-4">
      <div className="flex w-1/2 flex-col items-center gap-2">
        <p className="text-lg font-medium ">펜 굵기</p>
        <input
          type="range"
          min="1"
          max="20"
          value={pen.size}
          onChange={changePenSizeHandler}
          className="range range-xs range-primary"
        />
        <p className="text-lg font-medium ">펜 색</p>

        <div className="flex gap-2">
          <input
            type="radio"
            name="radio-penColor"
            className="radio checked:bg-black-500"
            onChange={changePenColorHandler.bind(this, "black")}
            checked={pen.color === "black"}
          />
          <input
            type="radio"
            name="radio-penColor"
            className="radio checked:bg-red-500"
            onChange={changePenColorHandler.bind(this, "#ef4444")}
            checked={pen.color === "#ef4444"}
          />
          <input
            type="radio"
            name="radio-penColor"
            className="radio checked:bg-green-500"
            onChange={changePenColorHandler.bind(this, "#22c55d")}
            checked={pen.color === "#22c55d"}
          />
          <input
            type="radio"
            name="radio-penColor"
            className="radio checked:bg-blue-500"
            onChange={changePenColorHandler.bind(this, "#3c82f6")}
            checked={pen.color === "#3c82f6"}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div
          onClick={changeModeHandler.bind(this, "draw")}
          className="grid w-20 h-20 cursor-pointer btn btn-ghost rounded-box place-items-center"
        >
          <FaPencilAlt className="shrink-0" size={40} />
        </div>
        <div className="divider divider-horizontal" />
        <div
          onClick={changeModeHandler.bind(this, "move")}
          className="grid w-20 h-20 cursor-pointer btn btn-ghost rounded-box place-items-center"
        >
          <FaExpandArrowsAlt className=" shrink-0" size={40} />
        </div>
        <div className="divider divider-horizontal" />
        <div
          onClick={removeHandler}
          className="grid w-20 h-20 border-0 cursor-pointer btn btn-accent btn-outline rounded-box place-items-center"
        >
          <FaTrashAlt className=" shrink-0" size={40} />
        </div>
      </div>
    </section>
  );
};

export default Draw;
