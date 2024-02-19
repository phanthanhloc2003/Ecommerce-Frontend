import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DataTable({ data,onDeleteProduct }) {
  const [open, setOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleClickOpen = (id) => {
    setProductIdToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDeleteProduct(productIdToDelete)
    setOpen(false);
  };

  let index = 1;
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 550 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th className="w-[100px]" scope="col">
              <input className="form-check-input" type="checkbox" />
            </th>

            <th className="w-[100px]" scope="col">
              số thứ tự
            </th>
            <th className="w-[200px]" scope="col">
              name
            </th>
            <th scope="col">price</th>
            <th scope="col">rating</th>
            <th scope="col">type</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.map((item) => (
            <tr className="text-center">
              <th scope="row">
                <input className="form-check-input" type="checkbox" />
              </th>
              <th scope="row">{index++}</th>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.rating}</td>
              <td>{item.type}</td>
              <td>
                <i
                  onClick={() => handleClickOpen(item._id)}
                  className="bi bi-trash hover:cursor-pointer"
                ></i>
                <React.Fragment key={"right"}>
                  <button onClick={toggleDrawer("right", true)}>
                    <i className=" bi-pen-fill"></i>
                  </button>
                  <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                  >
                    {list("right")}
                  </Drawer>
                </React.Fragment>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xoá sản phẩm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn chắc chắn xoá sản phẩm này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Đồng ý</Button>
          <Button onClick={handleClose} autoFocus>
            Huỷ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
