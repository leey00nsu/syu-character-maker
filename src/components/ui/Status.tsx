import { modeState } from "../../store/store";
import { useRecoilState } from "recoil";

const Status = () => {
  const [mode, setMode] = useRecoilState(modeState);

  if (mode === "draw") {
    return <p>그리기 모드입니다.</p>;
  }

  return <></>;
};

export default Status;
