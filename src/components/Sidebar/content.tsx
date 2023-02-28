import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
// icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddIcon from "@mui/icons-material/Add";
//
import api from "../../utils/axios";
// css
import "./index.css";

const Content = () => {
  const [boards, setBoards] = useState([]);

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
  const addColumn = () => {};

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
              <IconButton aria-label="delete" className="p-0 w-7 h-7 board-add cursor-pointer" onClick={addColumn}>
                <AddIcon className="text-[#D3D1CB]" />
              </IconButton>
            </Box>
          </ListSubheader>
        }
      >
        {boards.length ? (
          boards.map((board) => (
            <Link to="/">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="board one" />
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
