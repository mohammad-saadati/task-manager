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
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.board);
  console.log("boardData", boardData);
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
      const { data } = res;
      // if (res) setUser((prevState) => ({ ...prevState, ...res.data.user }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingColumn(false);
    }
  };

  return (
    <div className="flex items-start">
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppableSingle>
          {boardData.columnsOrder.map((columnId: string, index) => {
            const column = boardData.columns.find(
              (col) => col._id === columnId
            ) as ColumnType;
            const tasks = column?.tasksOrder.map((order) => {
              return column.tasks.find((task) => {
                return task.id === order;
              });
            });

            console.log("column", column);

            return column ? (
              <Column
                index={index}
                key={column._id}
                column={column}
                tasks={tasks}
              />
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
  );
};

export default TaskManagment;
