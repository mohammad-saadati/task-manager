import { FC, useState } from "react";
import TaskList from "../TaskList";
import StrictModeDroppable from "../StrictModeDroppable";
interface columnData {
  tasks: { id: string; content: string }[];
  column: { id: string; title: string; taskIds: string[] };
  index: number;
}

const Column: FC<columnData> = ({ column, tasks, index }) => {
  const [columnBgColor, setColumnBgColor] = useState("bg-white");

  const onColumnDraggingOver = (isDraggingOver = false) => {
    isDraggingOver
      ? setColumnBgColor("bg-gray-100")
      : setColumnBgColor("bg-white");
  };

  return (
    <div className={`w-64 p-4 border ${columnBgColor}`}>
      <div className={`${columnBgColor}`}>
        <StrictModeDroppable
          index={index}
          column={column}
          tasks={tasks}
          backgroundCallback={onColumnDraggingOver}
        />
      </div>
    </div>
  );
};

export default Column;
