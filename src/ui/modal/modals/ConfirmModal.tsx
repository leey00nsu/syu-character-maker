import { FormEvent, useEffect, useRef } from 'react';
import { useEventListener } from 'usehooks-ts';

import { Modal } from '@/store/modal/modalStore';

import useModal from '@/hooks/modal/useModal';

interface ConfirmModalProps {
  modal: Modal;
}

const ConfirmModal = ({ modal }: ConfirmModalProps) => {
  const { removeModal } = useModal();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEventListener('close', removeModal, modalRef);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const confirmHandler = (e: FormEvent) => {
    e.preventDefault();
    modal.callback();
    removeModal();
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{modal.title}</h3>
        <p className="py-4">{modal.content}</p>
        <div className="modal-action">
          <button onClick={confirmHandler} className="btn-primary btn">
            {modal.title}
          </button>
          <form method="dialog">
            <button className="btn">닫기</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>닫기</button>
      </form>
    </dialog>
  );
};

export default ConfirmModal;
