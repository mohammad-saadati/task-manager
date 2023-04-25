import { useMemo, useCallback } from "react";
import { Toolbar } from "./EditorMenu";
// slate
import { createEditor } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import { withHistory } from "slate-history";
//
import initialValue from "./initialValue";

const RichTextEditor = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Toolbar></Toolbar>
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

export default RichTextEditor;
