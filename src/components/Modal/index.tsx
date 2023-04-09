import { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { Dialog, DialogContent, Typography } from "@mui/material";
import ModalTitle from "./ModalTitle";

const Modal: FC = () => {
  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);

  if (modalIsOpen) {
    return (
      <Dialog open={modalIsOpen}>
        <ModalTitle>Task detail</ModalTitle>
        <DialogContent dividers>
          <Typography gutterBottom>task comment</Typography>
        </DialogContent>
      </Dialog>
    );
  } else {
    return <></>;
  }
};

export default Modal;
