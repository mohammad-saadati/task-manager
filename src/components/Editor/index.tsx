import { useMemo } from "react";
// slate
import { createEditor } from "slate";
import { withReact, Slate } from "slate-react";
import { withHistory } from "slate-history";
//
import initialValue from "./initialValue";

const RichTextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return <Slate editor={editor} value={initialValue}></Slate>;
};

export default RichTextEditor;
