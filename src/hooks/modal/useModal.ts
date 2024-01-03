import { useEffect } from 'react';
import { useEventListener } from 'usehooks-ts';

import { useModalStore } from '@/store/modal';

const useModal = () => {
  const isModalOpen = useModalStore(state => state.isModalOpen);
  const setIsModalOpen = useModalStore(state => state.setIsModalOpen);
  const addModal = useModalStore(state => state.addModal);
  const removeModal = useModalStore(state => state.removeModal);
  const removeAllModals = useModalStore(state => state.removeAllModals);
  const modals = useModalStore(state => state.modals);

  useEffect(() => {
    if (modals.length > 0) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [modals]);

  // 페이지가 이동할 때 모달을 닫는다
  useEventListener('popstate', () => {
    removeAllModals();
  });

  // 모달은 쌓이는 형태로 렌더링되기 때문에, 역순으로 렌더링한다.
  const reversedModals = [...modals].reverse();

  return {
    isModalOpen,
    setIsModalOpen,
    reversedModals,
    addModal,
    removeModal,
  };
};

export default useModal;
