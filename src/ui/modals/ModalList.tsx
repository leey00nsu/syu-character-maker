import useModal from '@/hooks/modal/useModal';

import ConfirmModal from './ConfirmModal';

const ModalList = () => {
  const { isModalOpen, reversedModals, removeModal } = useModal();

  if (!isModalOpen) return null;

  return (
    <>
      {reversedModals.map((modal, index) => {
        if (modal.type === 'confirm') {
          return (
            <ConfirmModal
              key={index}
              modal={modal}
              index={index}
              removeHandler={removeModal}
            />
          );
        }
      })}
    </>
  );
};

export default ModalList;
