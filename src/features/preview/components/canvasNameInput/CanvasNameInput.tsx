import { useCanvasStore } from '@/store/canvasStore';

import { MAX_CANVAS_NAME_LENGTH } from '../../constants/canvas';

const CanvasNameInput = () => {
  const canvasName = useCanvasStore(state => state.canvasName);
  const setCanvasName = useCanvasStore(state => state.setCanvasName);

  const changeCanvasNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (value.length > MAX_CANVAS_NAME_LENGTH) return;
    setCanvasName(value);
  };

  return (
    <div className="relative flex w-[160px] sm:w-[300px]">
      <input
        type="text"
        placeholder="작품명을 입력해주세요."
        value={canvasName}
        onChange={changeCanvasNameHandler}
        maxLength={MAX_CANVAS_NAME_LENGTH}
        className="input-bordered input input-sm w-full max-w-xs"
      />
      <label className="label absolute -right-12">
        <span className="label-text-alt">
          {`${canvasName.length} / ${MAX_CANVAS_NAME_LENGTH}`}
        </span>
      </label>
    </div>
  );
};

export default CanvasNameInput;
