import { useMemo, useCallback } from "react";
import { Toolbar } from "./EditorMenu";
// slate
import { createEditor, Editor } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import { withHistory } from "slate-history";
//
import initialValue from "./initialValue";
//
import Element from "./Element";
import Leaf from "./Leaf";
//
import isHotkey from "is-hotkey";
//
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
const RichTextEditor = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Toolbar></Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
export default RichTextEditor;
