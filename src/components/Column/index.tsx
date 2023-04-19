import { FC, useState } from "react";
import TaskList from "../TaskList";
import StrictModeDroppable from "../StrictModeDroppable";
// types
// import { Column as ColumnType } from "../../mock/initialData";
interface columnData {
  index: number;
  colId: string;
}

const Column: FC<columnData> = ({ index, colId }) => {
  const [columnBgColor, setColumnBgColor] = useState("bg-white");

  const onColumnDraggingOver = (isDraggingOver = false) => {
    isDraggingOver
      ? setColumnBgColor("bg-gray-100")
      : setColumnBgColor("bg-white");
  };

  return (
    <StrictModeDroppable
      index={index}
      id={colId}
      backgroundCallback={onColumnDraggingOver}
    />
  );
};

export default Column;
