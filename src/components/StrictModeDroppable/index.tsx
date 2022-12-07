import { useEffect, useState } from "react";
import { Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";
import TaskList from "../TaskList";

interface columnData {
  tasks: { id: string; content: string }[];
  column: { id: string; title: string; taskIds: string[] };
  backgroundCallback: (isDraggingOver: boolean) => void;
  index: number;
}

const StrictModeDroppable = ({
  column,
  tasks,
  backgroundCallback,
  index,
}: columnData) => {
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
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="w-64 p-4 border bg-white m-2"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div {...provided.dragHandleProps}>{column.title}</div>
          <Droppable droppableId={column.id}>
            {(provided, snapshot) => {
              backgroundCallback(snapshot.isDraggingOver);

              return (
                <div
                  className="min-h-column grow"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <TaskList tasks={tasks} />
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default StrictModeDroppable;
