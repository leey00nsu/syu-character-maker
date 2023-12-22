import { useEffect } from 'react';

import { useModalStore } from '@/store/modalStore';

const useModal = () => {
  const isModalOpen = useModalStore(state => state.isModalOpen);
  const setIsModalOpen = useModalStore(state => state.setIsModalOpen);
  const addModal = useModalStore(state => state.addModal);
  const removeModal = useModalStore(state => state.removeModal);
  const modals = useModalStore(state => state.modals);

  useEffect(() => {
    if (modals.length > 0) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [modals]);

  const reversedModals = [...modals].reverse();

  return {
    isModalOpen,
    reversedModals,
    addModal,
    removeModal,
  };
};

export default useModal;
