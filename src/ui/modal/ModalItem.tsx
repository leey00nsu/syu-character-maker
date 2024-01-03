import { Modal } from '@/store/modal/modalStore';

import { ConfirmModal } from './modals';
import ColorPickerModal from './modals/ColorPickerModal';

interface ModalProps {
  modal: Modal;
}

const ModalItem = ({ modal }: ModalProps) => {
  switch (modal.type) {
    case 'confirm':
      return <ConfirmModal modal={modal} />;
    case 'colorPicker':
      return <ColorPickerModal modal={modal} />;
    default:
      return null;
  }
};

export default ModalItem;
