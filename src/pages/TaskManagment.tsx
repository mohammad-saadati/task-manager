import initialData from "../mock/initialData";
import Column from "../components/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import React, { useState, useEffect } from "react";
import StrictModeDroppableSingle from "../components/StrictModeDroppableSingle";
import { useGetCurrentUserQuery } from "../store/thunks/index";
import { useAppDispatch } from '../store/hooks'
import { setCurrentUser } from '../store/features/currentUser'

const TaskManagment = () => {
  const { data, error, isLoading } = useGetCurrentUserQuery('');
  const dispatch = useAppDispatch()

  if(!isLoading) dispatch(setCurrentUser(data))

  const [enabled, setEnabled] = useState(false);
  const [boardData, setBoardData] = useState(initialData);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setBoardData((current) => {
      if (type === "column") {
        let columns = Array.from(current.columnOrder);

        columns.splice(source.index, 1);
        columns.splice(destination.index, 0, draggableId);

        return {
          ...current,
          columnOrder: columns,
        };
      }
      // reorder in the same column
      if (destination.droppableId === source.droppableId) {
        const srcColId = source.droppableId;
        // remove card from source
        let tempCol = Array.from(current.columns[srcColId].taskIds);
        tempCol.splice(source.index, 1);
        tempCol.splice(destination.index, 0, draggableId);

        const newCol = {
          ...current.columns[source.droppableId],
          taskIds: tempCol,
        };

        return {
          ...current,
          columns: {
            ...current.columns,
            [newCol.id]: newCol,
          },
        };
      } else {
        const startColId = source.droppableId;
        const desColId = destination.droppableId;
        // remove card from source
        let startCol = Array.from(current.columns[startColId].taskIds);

        startCol.splice(source.index, 1);

        const newStartCol = {
          ...current.columns[startColId],
          taskIds: startCol,
        };
        // add card to destination
        let desCol = Array.from(current.columns[desColId].taskIds);

        desCol.splice(destination.index, 0, draggableId);

        const newDesCol = {
          ...current.columns[desColId],
          taskIds: desCol,
        };

        return {
          ...current,
          columns: {
            ...current.columns,
            [newStartCol.id]: newStartCol,
            [newDesCol.id]: newDesCol,
          },
        };
      }
    });
  };
  // const onDragStart = (initial: any, provided: any) => {
  //   // console.log(initial, provided);
  // };
  // const onDragUpdate = (initial: any, provided: any) => {
  //   console.log(initial, provided);
  // };
  if(isLoading) return (<div>current user if fetching</div>)
  else
  return (
    <div className="flex">
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppableSingle>
          {boardData.columnOrder.map((columnId: string, index) => {
            const column = boardData.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => boardData.tasks[taskId]
            );

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
      </DragDropContext>
    </div>
  );
};

export default TaskManagment;
