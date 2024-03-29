import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
// modal actions from store
import { openModal } from "../../store/features/modal";
// icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Menu, MenuItem, TextField } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
//
import api from "../../utils/axios";
// store
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateTask, removeTask } from "../../store/features/board";

interface TaskListProps {
  tasks: { _id: string; title: string }[];
  children?:
    | React.ReactElement<HTMLElement, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
}

const TaskList: FC<TaskListProps> = ({ colId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const showModal = useAppDispatch();
  const [editingIndex, setEditingIndex] = useState<null | Number>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(false);
  const open = Boolean(anchorEl);
  // store
  const dispatcher = useAppDispatch();
  const col = useAppSelector((state) => {
    const col = state.board.columns.find((col) => col._id === colId);
    return col;
  });

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>, task, index) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setName(task.title);
    setEditingIndex(index);
    setEditingId(task._id);
  };
  const handleDelete = async () => {
    setAnchorEl(null);

    if (loading) return;
    setLoading(true);
    try {
      const url = `/tasks/${editingId}`;
      const res = await api.delete(url);
      const { data } = res;

      if (!data.error) dispatcher(removeTask(editingId));
      // dispatcher(updateColumnsOrder(data.column._id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleRename = async (id, index) => {
    if (loading) return;
    setLoading(true);
    try {
      const url = `/tasks/${id}`;
      const res = await api.put(url, { title: name });
      const { data } = res;
      if (!data.error) {
        dispatcher(updateTask(data.task));
        setIsEditing(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const showTaskModal = (task) => {
    showModal(openModal(task));
  };

  if (!col.tasksOrder.length) return;

  return (
    <>
      {col.tasksOrder.map((taskId, index) => {
        const task = col.tasks.find((task) => task._id === taskId);

        return task ? (
          <Draggable draggableId={task._id} index={index} key={task._id}>
            {(provided, snapshot) => (
              <div
                className={`shadow-task p-2 mb-2 hover:bg-cultured bg-white cursor-pointer ${
                  snapshot.isDragging ? "bg-cultured" : ""
                }`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <div
                  className="flex justify-between text-sm"
                  onClick={() => showTaskModal(task)}
                >
                  {isEditing && editingIndex === index ? (
                    <TextField
                      label=""
                      variant="standard"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleRename(task._id, index)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    task.title
                  )}

                  <MoreHorizIcon
                    onClick={(e) => handleContextMenu(e, task, index)}
                    className="text-[#D3D1CB]"
                  />
                </div>
                <Menu
                  elevation={1}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleDelete}>
                    <DeleteOutlineIcon sx={{ marginRight: 1 }} />
                    Delete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      setIsEditing(true);
                    }}
                  >
                    <DriveFileRenameOutlineIcon sx={{ marginRight: 1 }} />
                    Rename
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Draggable>
        ) : null;
      })}
    </>
  );
};

export default TaskList;
