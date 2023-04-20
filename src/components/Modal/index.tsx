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
// slatejs editor
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const Modal: FC = () => {
  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);
  const modalData = useAppSelector((state) => state.modal.data);
  const [comment, setComment] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // slatejs
  const [editor] = useState(() => withReact(createEditor()));

  if (modalIsOpen) {
    return (
      <Dialog open={modalIsOpen}>
        <ModalTitle title="Task detail"></ModalTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Descrition
            <Button
              sx={{ ml: 2 }}
              size="small"
              variant="contained"
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          </Typography>
          {editMode ? (
            <div>edit mode</div>
          ) : (
            <Typography gutterBottom>{modalData.description}</Typography>
          )}

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
