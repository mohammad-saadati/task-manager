import { PropsWithChildren, useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

interface columnData extends PropsWithChildren {}

const StrictModeDroppableSingle = ({ id, children }: columnData) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId={id} direction="horizontal" type="column">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-column"
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default StrictModeDroppableSingle;
