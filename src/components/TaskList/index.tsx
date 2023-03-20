import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
// modal actions from store
import { openModal } from "../../store/features/modal";
// icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Menu, MenuItem } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
//
import api from "../../utils/axios";
// store
import { useAppDispatch } from "../../store/hooks";
import { updateTask, removeTask } from "../../store/features/board";

interface TaskListProps {
  tasks: { _id: string; title: string }[];
  children?:
    | React.ReactElement<HTMLElement, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
}

const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const showModal = useAppDispatch();
  const [currentTask, setCurrentTask] = useState({});

  const open = Boolean(anchorEl);

  const dispatcher = useAppDispatch();

  const handleModal = (task: any) => {
    showModal(openModal("me"));
    setCurrentTask({ ...task });
  };
  const handleContextMenu = (
    e: React.MouseEvent<HTMLElement>,
    title: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setName(title);
  };
  const handleDelete = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      const url = `/tasks/${id}`;
      const res = await api.delete(url);
      const { data, error } = res;

      if (!error) dispatcher(removeTask(id));
      // dispatcher(updateColumnsOrder(data.column._id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleRename = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      const url = `/tasks/${id}`;
      const res = await api.put(url, { title: name });
      const { data } = res;

      // dispatcher(updateColumns(data.column));
      // dispatcher(updateColumnsOrder(data.column._id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log('tasks', tasks)
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
              <div className="flex justify-between">
                {task.title}
                <MoreHorizIcon
                  onClick={(e) => handleContextMenu(e, task.title)}
                  className="text-[#D3D1CB]"
                />
              </div>
              <Menu
                elevation={1}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleDelete(task._id)}>
                  <DeleteOutlineIcon sx={{ marginRight: 1 }} />
                  Delete
                </MenuItem>
                <MenuItem onClick={() => handleRename(task._id)}>
                  <DriveFileRenameOutlineIcon sx={{ marginRight: 1 }} />
                  Rename
                </MenuItem>
              </Menu>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default TaskList;
