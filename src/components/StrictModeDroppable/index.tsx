import { useEffect, useState } from "react";
import { Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";
import TaskList from "../TaskList";
// types
import { Column } from "../../mock/initialData";
// icons
import AddIcon from "@mui/icons-material/Add";
// style
import "./index.css";
import api from "../../utils/axios";
interface columnData {
  tasks: { id: string; content: string }[];
  column: Column;
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
  const addTask = async () => {
    try {
      // const url = `/auth/login/success`;
      // const res = await api.get(url);
     
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column-bar w-64 p-4 bg-white m-2"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className="flex justify-between items-center pb-2"
            {...provided.dragHandleProps}
          >
            <div>{column.title}</div>
            <div className="column-add" onClick={addTask}>
              <AddIcon className="text-[#D3D1CB]" />
            </div>
          </div>
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
