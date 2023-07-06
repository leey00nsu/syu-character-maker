import { FaPencilAlt, FaExpandArrowsAlt, FaTrashAlt } from "react-icons/fa";
import { useRecoilState } from "recoil";
import {
  modeState,
  objectState,
  selectedIdState,
  objectCountState,
} from "../../store/store";

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

  const changeOpacityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObject = [...objects].map((object) => {
      if (object.id === selectedId[0]) {
        return {
          ...object,
          opacity: Number(e.target.value),
        };
      }
      return object;
    });
    setObjects(newObject);
  };

  const selectedObject = objects.filter(
    (object) => object.id === selectedId[0]
  )[0];

  return (
    <div className="flex items-center justify-between w-full px-6 py-2  bg-base-100">
      <div className="flex items-center gap-2 ">
        <a className=" text-xl normal-case btn btn-ghost">
          나만의 수야 수호 만들기
        </a>
        <div className="flex justify-between gap-2">
          <div
            onClick={changeModeHandler.bind(this, "draw")}
            className={
              mode === "draw"
                ? "grid w-16 h-16 cursor-pointer btn btn-ghost btn-active rounded-box place-items-center"
                : "grid w-16 h-16 cursor-pointer btn btn-ghost rounded-box place-items-center"
            }
          >
            <FaPencilAlt className="shrink-0" size={30} />
          </div>

          <div
            onClick={changeModeHandler.bind(this, "move")}
            className={
              mode === "draw"
                ? "grid w-16 h-16 cursor-pointer btn btn-ghost rounded-box place-items-center"
                : "grid w-16 h-16 cursor-pointer btn btn-ghost btn-active rounded-box place-items-center"
            }
          >
            <FaExpandArrowsAlt className=" shrink-0" size={30} />
          </div>

          <div
            onClick={removeHandler}
            className="grid w-16 h-16 border-0 cursor-pointer btn btn-accent btn-outline rounded-box place-items-center"
          >
            <FaTrashAlt className=" shrink-0" size={30} />
          </div>
          {selectedId.length === 1 && (
            <div className="flex flex-col items-center">
              <p>투명도</p>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={selectedObject.opacity}
                onChange={changeOpacityHandler}
                className="range "
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        <button className="btn btn-square btn-ghost h-full">
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
