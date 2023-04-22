import { FC, useState, useCallback } from "react";
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
import { createEditor, Transforms, Editor, Text } from "slate";
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
const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};
// formati
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

const Modal: FC = () => {
  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);
  const modalData = useAppSelector((state) => state.modal.data);
  const [comment, setComment] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // slatejs
  const [editor] = useState(() => withReact(createEditor()));
  //
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

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
                  renderLeaf={Leaf}
                  renderElement={renderElement}
                  onKeyDown={(event) => {
                    if (!event.ctrlKey) {
                      return;
                    }
                    switch (event.key) {
                      // When "`" is pressed, keep our existing code block logic.
                      case "`": {
                        event.preventDefault();
                        const [match] = Editor.nodes(editor, {
                          match: (n) => n.type === "code",
                        });
                        Transforms.setNodes(
                          editor,
                          { type: match ? "paragraph" : "code" },
                          { match: (n) => Editor.isBlock(editor, n) }
                        );
                        break;
                      }

                      // When "B" is pressed, bold the text in the selection.
                      case "b": {
                        event.preventDefault();
                        Transforms.setNodes(
                          editor,
                          { bold: true },
                          // Apply it to text nodes, and split the text node up if the
                          // selection is overlapping only part of it.
                          { match: (n) => Text.isText(n), split: true }
                        );
                        break;
                      }
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
