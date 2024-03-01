import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

function EditDialog({ open, handleCloses, detailsUser, handleUpdateUser }) {
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickName] = useState("");
  const [err , setErr] = useState("");

  useEffect(() => {
    if (detailsUser) {
      setEmail(detailsUser.email || "");
      setAdmin(detailsUser.isAdmin || "");
      setName(detailsUser.name || "");
      setPhone(detailsUser.phone || "");
      setNickName(detailsUser.nickname || "");
    }
  }, [detailsUser]);

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^(0\d{9,10})$/;
    return phoneNumberPattern.test(phoneNumber);
  };
  
  const handleUpdateUsers = async () => {
    if(!isValidPhoneNumber(phone)) return setErr("bạn nhập ko đúng số điện thoaị , vui lòng nhập lại !")
    const isAdminValue = isAdmin === "true";
    await handleUpdateUser({ email, isAdmin: isAdminValue, name, phone, nickname });
    handleCloses()
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCloses}>
        <DialogTitle>Sửa</DialogTitle>
        <DialogContent>
          <DialogContentText>Sửa thông tin của user</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="isAdmin"
            name="isAdmin"
            label="isAdmin"
            type="search"
            fullWidth
            variant="standard"
            value={isAdmin ? "true" : "false"}
            onChange={(e) => setAdmin(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="name"
            type="search"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="phone"
            type="search"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="nickName"
            name="nickName"
            label="nickName"
            type="search"
            fullWidth
            variant="standard"
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
          />
          <span className="block text-center mt-[20px] text-[#B51700]">{err}</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloses}>Cancel</Button>
          <Button onClick={handleUpdateUsers}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditDialog;
