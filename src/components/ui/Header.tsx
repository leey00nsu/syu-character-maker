import { FaPencilAlt, FaExpandArrowsAlt, FaTrashAlt } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { modeState, objectState, selectedIdState } from "../../store/store";

const Header = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const [objects, setObjects] = useRecoilState(objectState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  const changeModeHandler = (changes: string) => {
    setMode(changes);
  };

  const removeHandler = () => {
    const new_objects = objects.filter(
      (object) => !selectedId.includes(object.id)
    );
    setObjects(new_objects);
    setSelectedId([]);
  };
  return (
    <div className="flex justify-between w-full p-2 items-center bg-base-100 h-20">
      <div className="flex items-center">
        <a className="btn btn-ghost normal-case text-xl">
          나만의 수야 수호 만들기
        </a>
        <div className="flex justify-between">
          <div
            onClick={changeModeHandler.bind(this, "draw")}
            className="grid w-16 h-16 cursor-pointer btn btn-ghost rounded-box place-items-center"
          >
            <FaPencilAlt className="shrink-0" size={30} />
          </div>

          <div
            onClick={changeModeHandler.bind(this, "move")}
            className="grid w-16 h-16 cursor-pointer btn btn-ghost rounded-box place-items-center"
          >
            <FaExpandArrowsAlt className=" shrink-0" size={30} />
          </div>

          <div
            onClick={removeHandler}
            className="grid w-16 h-16 border-0 cursor-pointer btn btn-accent btn-outline rounded-box place-items-center"
          >
            <FaTrashAlt className=" shrink-0" size={30} />
          </div>
        </div>
      </div>

      <div className="flex">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
