import { Typography } from "@mui/material";

function AdminUser() {
  return (
    <div className="mt-[10px]">
      <Typography>Quảng lý người dùng</Typography>
      <button className="border-[1px] w-[150px] h-[150px] border-dashed mt-[10px] transition-[0.5s] hover:text-[#0D74E5] hover:border-[#0D74E5] hover:shadow-md focus:outline-none focus:shadow-outline">
  <i className="bi bi-plus-lg text-[40px]"></i>
</button>
    </div>
  );
}

export default AdminUser;
