import { bgColorState, modeState, bgState, saveState } from "../store/store";
import { useRecoilState } from "recoil";

const Save = () => {
  const [save, setSave] = useRecoilState(saveState);

  const changeSaveHandler = () => {
    setSave(true);
  };
  return (
    <section>
      <button onClick={changeSaveHandler} className="btn  btn-primary btn-wide">
        다운로드
      </button>
    </section>
  );
};

export default Save;
