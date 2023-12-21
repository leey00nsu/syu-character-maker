interface ModalProps {
  label: string;
  children?: React.ReactNode;
}

const Modal = ({ label, children }: ModalProps) => {
  return (
    <>
      <dialog id={label} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
