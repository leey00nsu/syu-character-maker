import { useEffect } from 'react';
import { useEventListener } from 'usehooks-ts';

import { useModalStore } from '@/store/modalStore';

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

  useEventListener('popstate', () => {
    removeAllModals();
  });

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
