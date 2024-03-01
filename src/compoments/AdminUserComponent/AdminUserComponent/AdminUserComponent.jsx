import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  deleteUser,
  getAllUser,
  getDetailsUser,
  updateDataUser,
} from "../../../services/UserService";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import DeleteDialog from "../../DeleteDialogComponent/DeleteDialogComponent";
import EditDialog from "../../AccountComponent/EditDialogComponent/EditDialogComponent";
function AdminUser() {
  const user = useSelector((state) => state.user);
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [detailsUser, setDetailsUser] = useState(null);
  const token = user.access_Token;


  useEffect(() => {
    const fetchData = async () => {
      const user = await getAllUser(token);
      setDataUser(user.data);
    };

    fetchData();
  }, [loading]);



  const handleClickOpens = async (id) => {
    setOpens(true);
    setId(id)
    const token = user.access_Token;
    const data = await getDetailsUser(id, token);
    setDetailsUser(data.data);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const handleDelete = async () => {
    await deleteUser(id, token);
    setLoading(!loading);
    setOpen(false);
  };

  const handleUpdateUser = async (data) => {
    await updateDataUser(id , data , token ); 
    setLoading(!loading);
  }
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Email", headerName: "Email", width: 230 },
    { field: "Admin", headerName: "Admin", width: 90 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Phone", headerName: "Phone", width: 120 },
    { field: "NickName", headerName: "NickName", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center justify-center space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
            onClick={() => {
              handleClickOpens(params.row.id);
            }}
          >
            Sửa
          </button>
          <button
            onClick={() => {
              handleClickOpen(params.row.id);
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
          >
            Xoá
          </button>
        </div>
      ),
    },
  ];
  const rows = dataUser.map((item) => ({
    id: item._id, // Sử dụng index nếu không có id
    Email: item?.email,
    Name: item?.name,
    Admin: item?.isAdmin,
    Phone: item?.phone,
    NickName: item?.nickname,
  }));
  return (
    <div className="mt-[10px]">
      <Typography>Quảng lý người dùng</Typography>
      <div style={{ height: 700, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <DeleteDialog
        id={id}
        open={open}
        onHandleClose={handleClose}
        onHandleClickOpen={handleDelete}
      />
      <EditDialog
        open={opens}
        handleCloses={handleCloses}
        detailsUser={detailsUser}
        handleUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default AdminUser;
