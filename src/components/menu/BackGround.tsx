import { ChromePicker, ColorResult } from "react-color";
import { useRecoilState } from "recoil";
import { bgColorState, bgState, itemState } from "../../store/store";

const BackGround = () => {
  const [bgColor, setBgColor] = useRecoilState(bgColorState);
  const [bg, setBg] = useRecoilState(bgState);
  const [items, setItems] = useRecoilState(itemState);

  const changeBgHandler = (changes: string) => {
    setBg(changes);
    setItems([]);
  };

  const changeColorHandler = (color: ColorResult) => {
    setBgColor(color.hex);
  };

  return (
    <section className="flex justify-center px-4 py-16 border-t border-base-300">
      <div className="flex flex-col items-center w-1/2 gap-2">
        <p className=" font-medium text-lg">캐릭터</p>
        <div className="w-1/2">
          <label className="label cursor-pointer">
            <span className="label-text">수호</span>
            <input
              onChange={changeBgHandler.bind(this, "수호")}
              type="radio"
              name="radio-character"
              className="radio checked:bg-red-500"
              checked={bg === "수호"}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">수야</span>
            <input
              onChange={changeBgHandler.bind(this, "수야")}
              type="radio"
              name="radio-character"
              className="radio checked:bg-blue-500"
              checked={bg === "수야"}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/2 gap-2">
        <p className=" font-medium text-lg">배경색</p>
        <ChromePicker
          className="border shadow-none rounded-xl overflow-hidden"
          color={bgColor}
          onChange={changeColorHandler}
          // onChangeComplete={() => console.log(color)}
        />
      </div>
    </section>
  );
};

export default BackGround;
