import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

interface TaskListProps {
  tasks: { id: string; content: string }[];
  children?:
    | React.ReactElement<HTMLElement, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
}

const TaskList: FC<TaskListProps> = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Draggable
          draggableId={task.id}
          index={index}
          key={task.id}
        >
          {(provided, snapshot) => (
            <div
              className={`shadow-task p-2 mb-2 hover:bg-cultured bg-white cursor-pointer ${
                snapshot.isDragging ? "bg-cultured" : ""
              }`}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {task.content}
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default TaskList;
