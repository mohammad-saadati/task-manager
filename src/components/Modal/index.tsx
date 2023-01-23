import { useAppSelector } from "../../store/hooks";

const Modal = () => {
  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);

  if (modalIsOpen) {
    return <div>this is modal component {modalIsOpen}</div>;
  } else {
    return "";
  }
};

export default Modal;
