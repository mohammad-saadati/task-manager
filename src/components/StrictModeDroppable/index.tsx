import { useEffect, useState } from "react";
import { Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";
import TaskList from "../TaskList";
// types
import { Column } from "../../mock/initialData";
// icons
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// style
import "./index.css";
import api from "../../utils/axios";
// store
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  removeFromColumns,
  removeFromColumnsOrder,
  updateColumns,
  updateColumnsOrder,
} from "../../store/features/board";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [renameAnchorEl, setRenameAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [colName, setColName] = useState("");
  const [loading, setLoading] = useState(false);
  const openRenameMenu = Boolean(renameAnchorEl);
  const dispatcher = useAppDispatch();

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
  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setOpen(true);
    setName(column.title);
  };
  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const url = `/columns/${column._id}`;
      const res = await api.delete(url);
      const { data } = res;

      dispatcher(removeFromColumns(column._id));
      dispatcher(removeFromColumnsOrder(column._id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const renameColumn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const url = `/columns/${column._id}`;
      const res = await api.put(url, { title: colName });
      const { data } = res;

      dispatcher(updateColumns(data.column));
      // dispatcher(updateColumnsOrder(data.column._id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const createTask = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const url = `/tasks`;
      const res = await api.post(url, {
        columnId: column._id,
        title: "Untitled",
      });
      const { data } = res;

      dispatcher(updateColumns(data.column));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Draggable draggableId={column._id} index={index}>
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
            <div>
              <div
                className="column-title"
                onClick={(e) => {
                  setRenameAnchorEl(e.currentTarget);
                  setColName(column.title);
                }}
              >
                {column.title}
              </div>
              <Menu
                id="basic-menu"
                anchorEl={renameAnchorEl}
                open={openRenameMenu}
                onClose={(e) => setRenameAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <TextField
                    variant="standard"
                    value={colName}
                    onChange={(e) => {
                      setColName(e.target.value);
                    }}
                    onKeyDown={(e: KeyboardEvent) => {
                      e.stopPropagation();
                    }}
                  />
                  <Button
                    onClick={renameColumn}
                    sx={{ marginLeft: 2 }}
                    variant="contained"
                  >
                    done
                  </Button>
                </MenuItem>
              </Menu>
            </div>
            <div className="column-add" onClick={addTask}>
              <MoreHorizIcon
                onClick={(e) => handleContextMenu(e)}
                className="text-[#D3D1CB]"
              />
              <AddIcon className="text-[#D3D1CB]" onClick={createTask} />
              <Menu
                elevation={1}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDelete}>
                  <DeleteOutlineIcon sx={{ marginRight: 1 }} />
                  Delete
                </MenuItem>
              </Menu>
            </div>
          </div>
          <Droppable droppableId={column._id}>
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
