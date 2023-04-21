import { FaPencilAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { modeState } from "../store/store";
import { useRecoilState } from "recoil";

const Draw = () => {
  const [mode, setMode] = useRecoilState(modeState);

  const changeModeHandler = (changes: string) => {
    setMode(changes);
  };
  return (
    <section className="flex">
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
    </section>
  );
};

export default Draw;
