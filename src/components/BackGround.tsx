import { SketchPicker, ColorResult } from "react-color";
import { useRecoilState } from "recoil";
import { bgColorState, bgState } from "../store/store";

const BackGround = () => {
  const [bgColor, setBgColor] = useRecoilState(bgColorState);
  const [bg, setBg] = useRecoilState(bgState);

  const changeBgHandler = (changes: string) => {
    setBg(changes);
  };

  const changeColorHandler = (color: ColorResult) => {
    setBgColor(color.hex);
  };

  return (
    <section className="flex w-full justify-between px-6">
      <div className="flex flex-col items-center w-1/2 gap-2">
        <p className=" font-medium text-lg">캐릭터를 골라주세요</p>
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
        <p className=" font-medium text-lg">배경색을 골라주세요</p>
        <SketchPicker
          color={bgColor}
          onChange={changeColorHandler}
          // onChangeComplete={() => console.log(color)}
        />
      </div>
    </section>
  );
};

export default BackGround;
