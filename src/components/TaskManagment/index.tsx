import initialData, {
  initialData2,
  Column as ColumnType,
} from "../../mock/initialData";
import Column from "../Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import React, { useState, useEffect } from "react";
import StrictModeDroppableSingle from "../StrictModeDroppableSingle";
import { useGetCurrentUserQuery } from "../../store/thunks/index";
import { useAppDispatch } from "../../store/hooks";
import { setCurrentUser } from "../../store/features/currentUser";
//
import { Button } from "@mui/material";
// icons
import AddIcon from "@mui/icons-material/Add";

const TaskManagment = ({ boardData }) => {
  // const { data, error, isLoading } = useGetCurrentUserQuery("");
  const dispatch = useAppDispatch();

  // if (!isLoading) dispatch(setCurrentUser(data));

  const [enabled, setEnabled] = useState(false);
  // const [boardData, setBoardData] = useState(initialData2);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    console.log(destination, source, draggableId, type);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setBoardData((current) => {
      if (type === "column") {
        let columns = Array.from(current.columnsOrder);

        columns.splice(source.index, 1);
        columns.splice(destination.index, 0, draggableId);

        return {
          ...current,
          columnsOrder: columns,
        };
      }
      // reorder in the same column
      if (destination.droppableId === source.droppableId) {
        const srcColId = source.droppableId;
        // remove card from source
        let tempTaskOrder = Array.from(
          current.columns.find((col) => col.id === srcColId).tasksOrder
        );
        tempTaskOrder.splice(source.index, 1);
        tempTaskOrder.splice(destination.index, 0, draggableId);

        const newCol = {
          ...current.columns.find((col) => col.id === srcColId),
          tasksOrder: tempTaskOrder,
        } as ColumnType;

        const tempColumns = Array.from(current.columns);
        const matchedCol = tempColumns.findIndex((col) => col.id === newCol.id);
        tempColumns.splice(matchedCol, 1, newCol);
        // console.log("tempColumns", tempColumns);

        return {
          ...current,
          columns: [...tempColumns],
        };
      } else {
        const columnsCopy = Array.from(current.columns);
        const sourceCol = columnsCopy.findIndex(
          (col) => col.id === source.droppableId
        );
        const movedTask = columnsCopy[sourceCol].tasks[source.index];

        columnsCopy[sourceCol].tasks.splice(source.index, 1);
        columnsCopy[sourceCol].tasksOrder.splice(source.index, 1);

        const destinationCol = columnsCopy.findIndex(
          (col) => col.id === destination.droppableId
        );

        columnsCopy[destinationCol].tasks.splice(
          destination.index,
          0,
          movedTask
        );
        columnsCopy[destinationCol].tasksOrder.splice(
          destination.index,
          0,
          draggableId
        );

        return {
          ...current,
          columns: [...columnsCopy],
        };
      }
    });
  };

  return (
    <div className="flex">
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppableSingle>
          {boardData.columnsOrder.map((columnId: string, index) => {
            const column = boardData.columns.find(
              (col) => col.id === columnId
            ) as ColumnType;
            const tasks = column.tasksOrder.map((order) => {
              return column.tasks.find((task) => {
                return task.id === order;
              });
            });

            return (
              <Column
                index={index}
                key={column.id}
                column={column}
                tasks={tasks}
              />
            );
          })}
        </StrictModeDroppableSingle>
        <Button variant="outlined">
          <AddIcon />
        </Button>
      </DragDropContext>
    </div>
  );
};

export default TaskManagment;
