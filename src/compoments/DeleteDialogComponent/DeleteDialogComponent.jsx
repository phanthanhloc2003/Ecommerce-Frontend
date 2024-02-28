
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Slide } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DeleteDialog({open ,id ,onHandleClose, onHandleClickOpen  }) {
const handleDelete = async() => {
    await onHandleClickOpen(id)
}
    return ( 
        <div> 
            <React.Fragment>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={onHandleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"xoá"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              `Bạn có muốn chắt chắn xoá {id} này ko`
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={onHandleClose}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              Huỷ
            </button>
            <button
              onClick={handleDelete}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              Xoá
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
        </div>
     );
}

export default DeleteDialog;