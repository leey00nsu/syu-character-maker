import BackGround from "../BackGround";
import Photo from "../Photo";
import Draw from "../Draw";
import Save from "../Save";
import Items from "../Items";
import { bgColorState, menuState, modeState } from "../../store/store";
import { useRecoilState } from "recoil";

const Menu = () => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);

  const changeMenuHandler = (changes: string) => {
    setMenu(changes);
    setMode("move");
  };
  return (
    <div className="mockup-window border border-base-300 shrink-0 w-[600px]">
      <ul className="w-full justify-between  menu menu-horizontal bg-base-100 rounded-box p-2">
        <li>
          <a
            onClick={changeMenuHandler.bind(this, "꾸미기")}
            className={menu == "꾸미기" ? "px-10 active" : "px-10 "}
          >
            꾸미기
          </a>
        </li>
        <li>
          <a
            onClick={changeMenuHandler.bind(this, "배경")}
            className={menu == "배경" ? "px-10 active" : "px-10 "}
          >
            배경
          </a>
        </li>
        <li>
          <a
            onClick={changeMenuHandler.bind(this, "사진")}
            className={menu == "사진" ? "px-10 active" : "px-10 "}
          >
            사진
          </a>
        </li>
        <li>
          <a
            onClick={changeMenuHandler.bind(this, "그리기")}
            className={menu == "그리기" ? "px-10 active" : "px-10 "}
          >
            그리기
          </a>
        </li>
        <li>
          <a
            onClick={changeMenuHandler.bind(this, "저장")}
            className={menu == "저장" ? "px-10 active" : "px-10 "}
          >
            저장
          </a>
        </li>
      </ul>
      <div>
        {menu === "꾸미기" && <Items />}
        {menu === "배경" && <BackGround />}
        {menu === "사진" && <Photo />}
        {menu === "그리기" && <Draw />}
        {menu === "저장" && <Save />}
      </div>
    </div>
  );
};

export default Menu;
