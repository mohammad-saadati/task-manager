import { FC, useState } from "react";
import TaskList from "../TaskList";
import StrictModeDroppable from "../StrictModeDroppable";
// types
import { Column as ColumnType } from "../../mock/initialData";
interface columnData {
  tasks: { id: string; content: string }[];
  column: ColumnType;
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
    <StrictModeDroppable
      index={index}
      column={column}
      tasks={tasks}
      backgroundCallback={onColumnDraggingOver}
    />
  );
};

export default Column;
