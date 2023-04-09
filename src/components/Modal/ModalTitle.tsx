import React from "react";
import DialogTitle from "@mui/material/DialogTitle";

interface DialogTitleProps {
  children?: React.ReactElement;
  onClose: () => void;
}
const ModalTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return <DialogTitle {...other}>{children}</DialogTitle>;
};
