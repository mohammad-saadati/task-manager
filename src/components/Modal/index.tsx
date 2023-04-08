import { FC } from "react";
import { useAppSelector } from "../../store/hooks";

const Modal: FC = () => {
  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);

  if (modalIsOpen) {
    return (
      <SimpleDialog
        open={modalIsOpen}
        onClose={handleClose}
      />
    );
  } else {
    return <></>;
  }
};

export default Modal;
