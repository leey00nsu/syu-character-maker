import tw from '@/utils/tw';
import { IoSparkles } from 'react-icons/io5';

import useModal from '@/hooks/modal/useModal';

import useObjectControll from '@/features/canvas/hooks/useObjectControll';

import { ActiveButton } from '@/ui/buttons';

const CanvasResetButton = () => {
  const { addModal } = useModal();
  const { clearDrawingObjects, isDrawingObjectsEmpty } = useObjectControll();

  const resetHandler = () => {
    if (isDrawingObjectsEmpty) return;

    addModal({
      type: 'confirm',
      title: '초기화',
      content: '캔버스를 초기화 하시겠습니까?',
      callback: clearDrawingObjects,
    });
  };

  const iconClassNames = tw(
    'h-full w-full',
    isDrawingObjectsEmpty ? 'text-slate-400' : 'text-blue-400',
  );

  return (
    <ActiveButton
      clickHandler={resetHandler}
      className="btn-ghost btn h-6 min-h-0 w-6 p-0 hover:bg-transparent"
    >
      <IoSparkles className={iconClassNames} />
    </ActiveButton>
  );
};

export default CanvasResetButton;
