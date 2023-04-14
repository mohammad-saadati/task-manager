import { FC, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Dialog, DialogContent, TextField, Typography } from "@mui/material";
import ModalTitle from "./ModalTitle";

const Modal: FC = () => {
  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);
  const comment = useState(null);

  if (modalIsOpen) {
    return (
      <Dialog open={modalIsOpen}>
        <ModalTitle>Task detail</ModalTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            cupiditate nisi architecto placeat quae adipisci beatae similique
            ratione error! Praesentium ullam saepe ipsa nostrum voluptates
            eveniet vel quaerat maxime at.
          </Typography>
          <TextField
            id="outlined-required"
            label=""
            placeholder="Write a comment"
            multiline
            className="w-full"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  } else {
    return <></>;
  }
};

export default Modal;
