import { useEffect } from 'react';

import { useCanvasStore } from '@/store/canvas';

const useCanvasLoading = () => {
  const isCanvasLoading = useCanvasStore(state => state.isCanvasLoading);
  const setIsCanvasLoading = useCanvasStore(state => state.setIsCanvasLoading);

  useEffect(() => {
    if (isCanvasLoading) {
      useCanvasStore.persist.rehydrate();

      // canvasStore가 hydrate되기 전까지 로딩 화면을 보여준다.
      useCanvasStore.persist.onFinishHydration(() => {
        setIsCanvasLoading(false);
      });
    }
  }, []);

  return { isCanvasLoading };
};

export default useCanvasLoading;
