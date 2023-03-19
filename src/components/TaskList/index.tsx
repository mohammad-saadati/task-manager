import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from "../../store/hooks";
// modal actions from store
import { openModal } from "../../store/features/modal";

interface TaskListProps {
  tasks: { id: string; content: string }[];
  children?:
    | React.ReactElement<HTMLElement, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
}

const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const showModal = useAppDispatch();
  const [currentTask, setCurrentTask] = useState({});

  const handleModal = (task: any) => {
    showModal(openModal("me"));
    setCurrentTask({ ...task });
  };

  console.log('tasks...', tasks)

  return (
    <>
      {tasks.map((task, index) => (
        <Draggable draggableId={task._id} index={index} key={task._id}>
          {(provided, snapshot) => (
            <div
              onClick={(e) => handleModal(task)}
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
