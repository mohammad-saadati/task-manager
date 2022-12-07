import { PropsWithChildren, useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

interface columnData extends PropsWithChildren {}

const StrictModeDroppable = ({ children }: columnData) => {
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
    <Droppable droppableId="board" direction="horizontal" type="column">
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

export default StrictModeDroppable;
