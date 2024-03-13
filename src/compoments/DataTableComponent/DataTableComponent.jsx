import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { detailsProduct } from "../../services/ProductService";
import currency from "currency.js";

export default function DataTable({
  data,
  onDeleteProduct,
  onUpdateProduct,
  onDeleteManyProduct,
  token,
}) {
  const [open, setOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [opens, setOpens] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [countInStock, setCountInStock] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
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
    setId(data._id);
    setOpens(true);
  };
  const hanleOnUpdates = async () => {
    await onUpdateProduct(
      id,
      {
        name,
        type,
        description,
        countInStock,
        price,
        rating,
      },
      token
    );
    setOpens(false);
  };

  const handleDelete = async () => {
    await onDeleteManyProduct(selectedItems);
  };
  const handleCloses = () => {
    setOpens(false);
  };

  const handleCheckboxChange = (e, itemId) => {
    if (e.target.checked) {
      setSelectedItems((prevSelected) => [...prevSelected, itemId]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => id !== itemId)
      );
    }
  };

  const formatPrice = (inputValue) => {
    const formattedValue = currency(inputValue, { symbol: "", precision: 0 })
      .format()
      .replace(/,/g, ".");
    return formattedValue;
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
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, item._id)}
                />
              </th>
              <th scope="row">{index++}</th>
              <td>{item.name}</td>
              <td>
                {currency(item.price, { symbol: "", precision: 0 })
                  .format()
                  .replace(/,/g, ".")}{" "}
                <sup className="text-[75%] leading-[0] relative top-[-0.5em]">
                          ₫
                        </sup>
              </td>

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
      <button
        onClick={handleDelete}
        className="block ml-auto mr-[10px] bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
      >
        xoá
      </button>
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
              type="search"
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
              type="search"
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
              type="search"
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
              type="search"
              fullWidth
              variant="standard"
              defaultValue={price}
              onChange={(e) => {
                setPrice( e.target.value);
              }}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              name="description"
              label="description"
              type="search"
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
              type="search"
              fullWidth
              variant="standard"
              defaultValue={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
            <TextField
              autoFocus
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
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleCloses}
            >
              Huỷ
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              onClick={hanleOnUpdates}
            >
              OK
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
