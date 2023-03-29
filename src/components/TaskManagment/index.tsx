import initialData, {
  initialData2,
  Column as ColumnType,
} from "../../mock/initialData";
import Column from "../Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import React, { useState, useEffect } from "react";
import StrictModeDroppableSingle from "../StrictModeDroppableSingle";
// store
import { useGetCurrentUserQuery } from "../../store/thunks/index";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentUser } from "../../store/features/currentUser";
import {
  addColumns,
  addColumnsOrder,
  moveColumn,
  reorderTask,
  moveTask,
} from "../../store/features/board";
//
import { Button, Menu, MenuItem, TextField } from "@mui/material";
// icons
import AddIcon from "@mui/icons-material/Add";
//
import api from "../../utils/axios";
// router
import { useParams } from "react-router-dom";

const TaskManagment = () => {
  let { id } = useParams();
  const [loadingColumn, setLoadingColumn] = useState(false);
  const [colName, setColName] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const { data, error, isLoading } = useGetCurrentUserQuery("");
  const dispatcher = useAppDispatch();
  const boardData = useAppSelector((state) => state.board);

  // if (!isLoading) er(setCurrentUser(data));

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

    if (type === "column") {
      const temp = async () => {
        try {
          const url = `/columns/reorder`;
          const res = await api.put(url, {
            columnId: draggableId,
            boardId: destination.droppableId,
            targetIndex: destination.index,
            sourceIndex: source.index,
          });
          const { error } = res.data;
          return error;
        } catch (err) {
          console.log(err);
          return;
        } finally {
        }
      };
      temp();
      dispatcher(
        moveColumn({
          destinationIndex: destination.index,
          sourceIndex: source.index,
          draggableId,
        })
      );
      return;
    }
    // reorder in the same column
    if (destination.droppableId === source.droppableId) {
      const temp = async () => {
        try {
          const url = `/tasks/reorder`;
          const res = await api.put(url, {
            taskId: draggableId,
            columnId: destination.droppableId,
            targetIndex: destination.index,
            sourceIndex: source.index
          });
          const { error } = res.data;
        } catch (err) {
          console.log(err);
          return;
        } finally {
        }
      };
      temp();
      dispatcher(
        reorderTask({
          destinationIndex: destination.index,
          sourceIndex: source.index,
          colId: destination.droppableId,
          draggableId,
        })
      );
    } else {
      dispatcher(
        moveTask({
          destination,
          source,
          draggableId,
        })
      );
    }
  };
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const createColumn = async () => {
    if (loadingColumn) return;
    setLoadingColumn(true);

    try {
      const url = `/columns`;
      const res = await api.post(url, {
        title: colName,
        boardId: id,
      });
      const { column, error } = res.data;

      if (!error) {
        handleClose();
        dispatcher(addColumns(column));
        dispatcher(addColumnsOrder(column._id));
      }

      // if (res) setUser((prevState) => ({ ...prevState, ...res.data.user }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingColumn(false);
    }
  };

  return (
    <div className="flex flex-col items-start font-semibold text-2xl">
      <div>{boardData.title}</div>
      <div className="flex">
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppableSingle id={boardData._id}>
            {boardData.columnsOrder.map((columnId: string, index) => {
              const column = boardData.columns.find(
                (col) => col._id === columnId
              ) as ColumnType;
              const tasks = column?.tasksOrder?.map((order) => {
                return column.tasks.find((task) => {
                  return task._id === order;
                });
              });

              return column ? (
                <Column index={index} colId={column._id} key={column._id} />
              ) : null;
            })}
          </StrictModeDroppableSingle>
          <div className="py-4">
            <Button variant="outlined" onClick={openMenu}>
              <AddIcon />
            </Button>
          </div>
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem>
              <TextField
                label=""
                variant="standard"
                value={colName}
                onChange={(e) => setColName(e.target.value)}
                onKeyDown={(e: KeyboardEvent) => {
                  e.stopPropagation();
                }}
              />
              <Button
                onClick={createColumn}
                sx={{ marginLeft: 2 }}
                variant="contained"
              >
                create
              </Button>
            </MenuItem>
          </Menu>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskManagment;
