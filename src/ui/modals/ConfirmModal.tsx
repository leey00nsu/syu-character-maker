import { FormEvent, useEffect, useRef } from 'react';

import { Modal } from '@/store/modalStore';

import useEventListener from '@/hooks/useEventListener';

interface ConfirmModalProps {
  index: number;
  modal: Modal;
  removeHandler: () => void;
}

const ConfirmModal = ({ modal, index, removeHandler }: ConfirmModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEventListener('close', removeHandler, modalRef);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const confirmHandler = (e: FormEvent) => {
    e.preventDefault();
    modal.callback();
    removeHandler();
  };

  return (
    <dialog ref={modalRef} id={'modal' + index} className="modal">
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
