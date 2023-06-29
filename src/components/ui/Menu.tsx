import BackGround from "../BackGround";
import Upload from "../Upload";
import Draw from "../Draw";
import Save from "../Save";
import Items from "../Items";
import { bgColorState, menuState, modeState } from "../../store/store";
import { useRecoilState } from "recoil";
import { menus } from "../../constants/menus";

const Menu = (props: any) => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);

  const changeMenuHandler = (changes: string) => {
    setMenu(changes);
    setMode("move");
  };
  return (
    <div className="mockup-window border border-base-300 shrink-0 w-[600px]">
      <ul className="w-full justify-between  menu menu-horizontal bg-base-100 rounded-box p-2">
        {menus.map((m) => (
          <li key={m}>
            <a
              onClick={changeMenuHandler.bind(this, m)}
              className={menu == m ? "px-10 active" : "px-10 "}
            >
              {m}
            </a>
          </li>
        ))}
      </ul>
      <div>
        {menu === "꾸미기" && <Items />}
        {menu === "배경" && <BackGround />}
        {menu === "사진" && <Upload />}
        {menu === "그리기" && <Draw />}
        {menu === "저장" && <Save stageRef={props.stageRef} />}
      </div>
    </div>
  );
};

export default Menu;
