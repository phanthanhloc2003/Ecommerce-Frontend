import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import { useEffect } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ opens  , hanleClose}) {
  const [open, setOpen] = useState(opens);
  const handleClose = () => {
    setOpen(false);
    hanleClose(false)
  };
  useEffect(() => {
    setOpen(opens);
  }, [opens]);
 
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Bạn vẫn chưa chọn sản phẩm nào để mua
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ok , đã hiểu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
