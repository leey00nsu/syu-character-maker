import { FormEvent, useEffect, useRef, useState } from 'react';
import { ColorResult } from 'react-color';
import { useEventListener } from 'usehooks-ts';

import { Modal } from '@/store/modalStore';

import useModal from '@/hooks/modal/useModal';

import { ColorPicker } from '@/ui/inputs';

interface ColorPickerModalProps {
  modal: Modal;
}

const ColorPickerModal = ({ modal }: ColorPickerModalProps) => {
  const [currentColor, setCurrentColor] = useState(modal.content);
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
    modal.callback(currentColor);
    removeModal();
  };

  const changeColorHandler = (color: ColorResult) => {
    setCurrentColor(color.hex);
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{modal.title}</h3>
        <div className="flex w-full justify-center">
          <ColorPicker
            disableAlpha
            color={currentColor}
            changeHandler={changeColorHandler}
          />
        </div>
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

export default ColorPickerModal;
