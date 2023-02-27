import { Box, Drawer } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeDrawer } from "../../store/features/drawer";

const Sidebar = () => {
  const dispatcher = useAppDispatch();
  const modalIsOpen = useAppSelector((state) => state.drawer.drawerIsOpen);

  return (
    <Box>
      <Drawer
        anchor="left"
        open={modalIsOpen}
        onClose={() => dispatcher(closeDrawer())}
      >
        emtpy drawer
      </Drawer>
    </Box>
  );
};

export default Sidebar;
