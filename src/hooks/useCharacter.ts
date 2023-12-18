import { useRecoilState } from 'recoil';

import { drawingObjectState } from '@/store/canvasStore';

// 현재 캐릭터를 가져오는 커스텀 훅
const useCharacter = () => {
  const [drawingObjects] = useRecoilState(drawingObjectState);

  const character = drawingObjects.find(object => object.name === 'character')
    ?.id;

  return { character };
};

export default useCharacter;
