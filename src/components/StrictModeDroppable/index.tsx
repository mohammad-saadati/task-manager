import { useEffect, useState } from "react";
import { Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";
import TaskList from "../TaskList";
// types
import { Column } from "../../mock/initialData";
// icons
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Menu, MenuItem } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// style
import "./index.css";
import api from "../../utils/axios";
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
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

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
  const addTask = async () => {
    try {
      // const url = `/auth/login/success`;
      // const res = await api.get(url);
    } catch (err) {
      console.log(err);
    }
  };
  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setOpen(true);
    setName(column.title);
  };
  const handleDelete = () => {
    
  };
  const handleClose = () => {
    setOpen(false);
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
            <div>{column.title}</div>
            <div className="column-add" onClick={addTask}>
              <MoreHorizIcon
                onClick={(e) => handleContextMenu(e)}
                className="text-[#D3D1CB]"
              />
              <AddIcon className="text-[#D3D1CB]" />
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
                <MenuItem onClick={() => handleDelete(column._id)}>
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
