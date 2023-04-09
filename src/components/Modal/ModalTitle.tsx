import React from "react";
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../store/hooks";
import { closeModal } from "../../store/features/modal";

interface DialogTitleProps {
  children?: React.ReactElement;
  onClose: () => void;
}
const ModalTitle = (props: DialogTitleProps) => {
  const { children, ...other } = props;
  const dispatch = useAppDispatch();

  const closeTaskModal = () => {
    dispatch(closeModal());
  };

  return (
    <DialogTitle
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      {...other}
    >
      {children}
      <IconButton onClick={closeTaskModal}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};
export default ModalTitle;
