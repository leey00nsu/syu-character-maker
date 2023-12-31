import { Modal } from '@/store/modalStore';

import { ConfirmModal } from './modals';

interface ModalProps {
  modal: Modal;
}

const ModalItem = ({ modal }: ModalProps) => {
  switch (modal.type) {
    case 'confirm':
      return <ConfirmModal modal={modal} />;
    default:
      return null;
  }
};

export default ModalItem;
