import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
//
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch } from "../../store/hooks";
import { openDrawer, closeDrawer } from "../../store/features/drawer";
//
import { useAppSelector } from "../../store/hooks";
import LogoutIcon from "@mui/icons-material/Logout";

const Appbar = () => {
  const user = useAppSelector((state) => state.currentUser.currentUser);
  const dispatcher = useAppDispatch();

  const drawerHanlder = () => {
    dispatcher(openDrawer());
  };
  const logout = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`,
      "_self"
    );
  };

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={drawerHanlder}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div>{user.username}</div>
          </Typography>

          <Button
            sx={{ color: "white" }}
            onClick={logout}
            variant="text"
            startIcon={<LogoutIcon />}
          >
            log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
