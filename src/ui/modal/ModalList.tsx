import useModal from '@/hooks/modal/useModal';

import ModalItem from './ModalItem';

const ModalList = () => {
  const { isModalOpen, reversedModals } = useModal();

  if (!isModalOpen) return null;

  return (
    <>
      {reversedModals.map((modal, index) => (
        <ModalItem key={index} modal={modal} />
      ))}
    </>
  );
};

export default ModalList;
