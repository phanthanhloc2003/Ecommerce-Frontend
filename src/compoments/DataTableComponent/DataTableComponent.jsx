import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { detailsProduct } from "../../services/ProductService";

export default function DataTable({ data, onDeleteProduct, onUpdateProduct }) {
  const [open, setOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [opens, setOpens] = useState(false);
  const [id , setId]=useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [countInStock, setCountInStock] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(null);
  const [image, setImage] = useState(null);
  const handleClickOpen = (id) => {
    setProductIdToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDeleteProduct(productIdToDelete);
    setOpen(false);
  };
  const handleClickOpens = async (id) => {
    const data = await detailsProduct(id);

    setName(data.name);
    setType(data.type);
    setDescription(data.description);
    setCountInStock(data.countInStock);
    setRating(data.rating);
    setPrice(data.price);
    setId(data._id)
    setOpens(true);
    
  };
  const hanleOnUpdate = async() => {
  await onUpdateProduct(id , {name , type, description, countInStock, price, rating})
  }

  const handleCloses = () => {
    setOpens(false);
  };
  let index = 1;
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
                <i
                  onClick={() => handleClickOpens(item._id)}
                  className=" bi-pen-fill hover:cursor-pointer"
                ></i>
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
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xoá sản phẩm"}
        </DialogTitle>
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
      <React.Fragment>
        <Dialog
          open={opens}
          onClose={handleCloses}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Cập nhật</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              name="name"
              label="name"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="type"
              label="type"
              type="type"
              fullWidth
              variant="standard"
              defaultValue={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="Count inStock"
              label="Count inStock"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={countInStock}
              onChange={(e) => {
                setCountInStock(e.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="price"
              label="price"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              name="description"
              label="description"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="rating"
              label="rating"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="Count inStock"
              type="file"
              fullWidth
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses}>Cancel</Button>
            <Button onClick={hanleOnUpdate}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
