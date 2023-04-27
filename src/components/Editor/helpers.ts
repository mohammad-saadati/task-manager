import { Editor } from "slate";

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
export const isMarkActive = (editor, format) => {
  console.log(editor)
  const marks = Editor.marks(editor);
  console.log(marks)
  return marks ? marks[format] === true : false;
};
