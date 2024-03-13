import {
  Box,
  FormControl,

  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DataTable from "../DataTableComponent/DataTableComponent";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  UpdateProduct,
  addProduct,
  deleteMany,
  deleteProduct,
  getAllProduct,
} from "../../services/ProductService";
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function AdminProduct() {
  const [open, setOpen] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const { register, handleSubmit } = useForm();
  const user = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const token = user.access_Token;
  useEffect(() => {
    fetchData();
  }, [reloadData]);

  const fetchData = async () => {
    const data = await getAllProduct();
    setRows(data.data);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setReloadData(!reloadData);
  };
  const handleUpdateProduct = async (id, data, token) => {
    await UpdateProduct(id, data, token);
    setOpen(false);
    setReloadData(!reloadData);
  };

  const handleDeleteMany = async (id) => {
    await deleteMany(id, token);
    setReloadData(!reloadData);
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("countInStock", data.countInStock);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("rating", data.rating);
    formData.append("image", data.image[0]);
    await addProduct(formData);
    setReloadData(!reloadData);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="mt-[10px]">
      <Typography>Quảng lý người dùng</Typography>
      <button
        onClick={handleClickOpen}
        className="border-[1px] w-[150px] h-[150px] border-dashed mt-[10px] transition-[0.5s] hover:text-[#0D74E5] hover:border-[#0D74E5] hover:shadow-md focus:outline-none focus:shadow-outline"
      >
        <i className="bi bi-plus-lg text-[40px]"></i>
      </button>
      <div className="mt-[20px]">
        <DataTable
          data={rows}
          token={token}
          reloadData={reloadData}
          onUpdateProduct={handleUpdateProduct}
          onDeleteManyProduct={handleDeleteMany}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
      <Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            thêm sản phẩm
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <form
              onSubmit={handleSubmit(onSubmit)}
              enctype="multipart/form-data"
            >
              <div className="flex items-center py-[20px]">
                <label className="w-[250px]"> name:</label>
                <input
                  {...register("name")}
                  className=" w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                  type="text"
                  placeholder="nhập name"
                />
              </div>
              <div className="flex items-center py-[20px]">
                <label className="w-[250px]"> type:</label>
                <Box
                  sx={{
                    width: "100%",
                    height:"36px",
                    border: "1px solid",
                    borderColor: "#D1D5DB",
                    borderRadius: "4px",
                    transition: "all 150ms ease-in-out",
                    "&:hover": { borderColor: "#2563EB" },
                    "&:focus": {
                      borderColor: "#2563EB",
                      outline: "none",
                      boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.5)",
                    },
                  }}
                >
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedType}
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        register("type", { value: e.target.value });
                      }}
                      label="Loại"
                      sx={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        height:"36px",
                        borderRadius: "4px",
                        "&:hover": { borderColor: "#2563EB" },
                        "&:focus": {
                          borderColor: "#2563EB",
                          outline: "none",
                          boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.5)",
                        },
                      }}
                    >
                      <MenuItem value={"điện thoại"}>điện thoại</MenuItem>
                      <MenuItem value={"máy tính"}>máy tính</MenuItem>
                      <MenuItem value={"quần áo"}>quần áo</MenuItem>
                      <MenuItem value={"đồ da dụng"}>đồ da dụng</MenuItem>
                      <MenuItem value={"chuột"}>chuột</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className="flex items-center py-[20px]">
                <label className="w-[250px]"> Count inStock:</label>
                <input
                  {...register("countInStock")}
                  className=" w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                  type="text"
                  placeholder="nhập Count inStock"
                />
              </div>
              <div className="flex items-center py-[20px]">
                <label className="w-[250px]"> price</label>
                <input
                  {...register("price")}
                  className=" w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                  type="text"
                  placeholder="nhập price"
                />
              </div>
              <div className="flex items-center py-[20px]">
                <label className="w-[250px]"> description</label>
                <input
                  {...register("description")}
                  className=" w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                  type="text"
                  placeholder="nhập description"
                />
              </div>
              <div className="flex items-center py-[20px]">
                <label className="w-[250px]"> rating</label>
                <input
                  {...register("rating")}
                  className=" w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                  type="text"
                  placeholder="nhập rating"
                />
              </div>
              <div className="flex items-center py-[20px]">
                <label className="w-[250px]"> image</label>

                <input
                  className=" w-[100%]  outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[50px] py-[10px] px-[12px]"
                  {...register("image")}
                  enctype="multipart/form-data"
                  type="file"
                  name="image"
                />
              </div>
              <div className="flex items-center py-[20px]">
                <label className="w-[250px]"> </label>
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-600"
                  onClick={handleClose}
                >
                  Lưu
                </button>
              </div>
            </form>
          </DialogContent>
        </BootstrapDialog>
      </Fragment>
    </div>
  );
}

export default AdminProduct;
