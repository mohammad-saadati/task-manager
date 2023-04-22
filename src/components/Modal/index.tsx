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
// editor types
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
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
            <div>
              <Slate editor={editor} value={initialValue}>
                <Editable
                  onKeyDown={(event) => {
                    if (event.key === "&") {
                      // Prevent the ampersand character from being inserted.
                      event.preventDefault();
                      // Execute the `insertText` method when the event occurs.
                      editor.insertText("and");
                    }
                  }}
                />
              </Slate>
            </div>
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
