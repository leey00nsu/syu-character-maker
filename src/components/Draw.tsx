import { FaPencilAlt, FaExpandArrowsAlt, FaTrashAlt } from "react-icons/fa";
import { modeState, removeState } from "../store/store";
import { useRecoilState } from "recoil";

const Draw = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [remove, setRemove] = useRecoilState(removeState);

  const changeModeHandler = (changes: string) => {
    setMode(changes);
  };

  const removeHandler = () => {
    setRemove(true);
  };
  return (
    <section className="flex justify-center w-full">
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
          className="grid w-20 h-20 cursor-pointer btn btn-accent border-0 btn-outline rounded-box place-items-center"
        >
          <FaTrashAlt className=" shrink-0" size={40} />
        </div>
      </div>
    </section>
  );
};

export default Draw;
