import { Box, Divider, Drawer, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// store
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeDrawer } from "../../store/features/drawer";
//
import Content from "./content";

const Sidebar = () => {
  const theme = useTheme();
  const dispatcher = useAppDispatch();
  const drawerState = useAppSelector((state) => state.drawer);

  return (
    <Box>
      <Drawer
        anchor="left"
        open={drawerState.drawerIsOpen}
        onClose={() => dispatcher(closeDrawer())}
        variant="persistent"
        sx={{ maxWidth: drawerState.drawerWidth }}
      >
        <div className="flex justify-end">
          <IconButton onClick={() => dispatcher(closeDrawer())}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Content />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
