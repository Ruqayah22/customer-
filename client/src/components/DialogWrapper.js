import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const DialogWrapper = ({ open, onClose, title, component }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {React.cloneElement(component, { onClose })}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
