import { FC, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import ModalTitle from "./ModalTitle";

const Modal: FC = () => {
  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);
  const modalData = useAppSelector((state) => state.modal.data);
  const [comment, setComment] = useState(null);

  if (modalIsOpen) {
    return (
      <Dialog open={modalIsOpen}>
        <ModalTitle title="Task detail"></ModalTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{modalData.description}</Typography>
          <TextField
            id="outlined-required"
            label=""
            placeholder="Write a comment"
            multiline
            className="w-full"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button variant="contained" disabled={!comment} sx={{ mt: 1 }}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    );
  } else {
    return <></>;
  }
};

export default Modal;
