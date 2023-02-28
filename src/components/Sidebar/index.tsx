import { Box, Drawer } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeDrawer } from "../../store/features/drawer";
import Content from "./content";

const Sidebar = () => {
  const dispatcher = useAppDispatch();
  const drawerState = useAppSelector((state) => state.drawer);

  return (
    <Box>
      <Drawer
        anchor="left"
        open={drawerState.drawerIsOpen}
        onClose={() => dispatcher(closeDrawer())}
        variant="temporary"
        sx={{ maxWidth: drawerState.drawerWidth }}
      >
        <Content />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
