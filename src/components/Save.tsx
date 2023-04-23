import { saveState } from "../store/store";
import { useRecoilState } from "recoil";

const Save = () => {
  const [save, setSave] = useRecoilState(saveState);

  const changeSaveHandler = () => {
    setSave(true);
  };
  return (
    <section>
      <button onClick={changeSaveHandler} className="btn btn-primary btn-wide">
        이미지 파일로 저장하기
      </button>
    </section>
  );
};

export default Save;
