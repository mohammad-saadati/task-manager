import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
// icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
//
import api from "../../utils/axios";
// css
import "./index.css";
// store
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateTitle } from "../../store/features/board";

const Content = () => {
  const user = useAppSelector((state) => state.currentUser.currentUser);
  const dispatcher = useAppDispatch();

  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("Untitled");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [editingId, setEditingId] = useState<null | number>(null);

  const navigate = useNavigate();
  // const { id } = useParams();

  const getData = useCallback(async () => {
    try {
      const url = `/boards`;
      const res = await api.get(url);
      const { data } = res;
      // if (res) setUser((prevState) => ({ ...prevState, ...res.data.user }));
      setBoards(data.boards);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const addColumn = async () => {
    try {
      const url = `/boards`;
      const res = await api.post(url, { title });
      const { data } = res;

      setBoards([data.board, ...boards]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleContextMenu = (e: React.MouseEvent<HTMLElement>, index, id) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setOpen(true);
    setActiveIndex(index);
    setEditingId(id);
    setName(boards[index].title);
  };
  const handleClose = async (boardID) => {
    try {
    } catch (error) {}
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const url = `/boards/${editingId}`;
      const res = await api.delete(url);
      const { board, error } = res.data;
      if (!error) {
        setBoards((current) => {
          return current.filter((item) => item._id !== board._id);
        });
        setOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRename = async (boardId, index) => {
    try {
      const url = `/boards/${boardId}`;
      const res = await api.put(url, { title: name });

      if (!res.data.error) {
        const { board } = res.data;

        dispatcher(updateTitle(name));

        setBoards((current) => {
          const temp = [...current];
          temp.splice(index, 1, board);
          return [...temp];
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) getData();
  }, [getData]);

  return (
    <Box sx={{ width: 250 }}>
      <List
        subheader={
          <ListSubheader
            className="board-bar"
            component="div"
            id="nested-list-subheader"
          >
            <Box className="flex justify-between items-center">
              Boards
              <IconButton
                aria-label="delete"
                className="p-0 w-7 h-7 board-add cursor-pointer"
                onClick={addColumn}
              >
                <AddIcon className="text-[#D3D1CB]" />
              </IconButton>
            </Box>
          </ListSubheader>
        }
      >
        {boards.length ? (
          boards.map((board, index) => (
            <Link to={`board/${board._id}`} key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardOutlinedIcon sx={{ minWidth: 30 }} />
                </ListItemIcon>
                {isEditing && activeIndex === index ? (
                  <TextField
                    id="standard-basic"
                    label=""
                    variant="standard"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleRename(board._id, index)
                    }
                  />
                ) : (
                  <ListItemText primary={board?.title} />
                )}

                <Button
                  id="basic-button"
                  onClick={(e) => handleContextMenu(e, index, board._id)}
                >
                  <MoreHorizIcon className="text-[#0f172a]" />
                </Button>
              </ListItemButton>
            </Link>
          ))
        ) : (
          <Box className="px-4 text-xs">there is no board</Box>
        )}
      </List>
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
        <MenuItem
          onClick={() => {
            setIsEditing(true);
            setOpen(false);
          }}
        >
          <DriveFileRenameOutlineIcon sx={{ marginRight: 1 }} />
          Rename
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Content;
