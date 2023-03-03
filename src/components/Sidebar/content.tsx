import { Link } from "react-router-dom";
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
} from "@mui/material";
// icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
//
import api from "../../utils/axios";
// css
import "./index.css";

const Content = () => {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("Untitled");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getData = useCallback(async () => {
    try {
      const url = `/boards`;
      const res = await api.get(url);
      const { data } = res;
      // if (res) setUser((prevState) => ({ ...prevState, ...res.data.user }));
      console.log("res", res);

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
      // if (res) setUser((prevState) => ({ ...prevState, ...res.data.user }));
      console.log("res", res);

      setBoards([...boards, data.board]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleContextMenu = () => {};
  const handleClose = () => {};

  useEffect(() => {
    getData();
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
          boards.map((board) => (
            <Link to={`board/${board._id}`} key={board._id}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardOutlinedIcon sx={{ minWidth: 30 }} />
                </ListItemIcon>
                <ListItemText primary={board?.title} />

                <Button id="basic-button" onClick={handleContextMenu}>
                  <MoreHorizIcon className="text-[#0f172a]" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </ListItemButton>
            </Link>
          ))
        ) : (
          <Box className="px-4 text-xs">there is no board</Box>
        )}
      </List>
    </Box>
  );
};

export default Content;
