import { useRecoilState } from 'recoil';

import { canvasObjectsState } from '@/store/canvasStore';

// 현재 캐릭터를 가져오는 커스텀 훅
const useCharacter = () => {
  const [canvasObjects] = useRecoilState(canvasObjectsState);

  const character = canvasObjects.find(object => object.name === 'character')
    ?.id;

  return { character };
};

export default useCharacter;
