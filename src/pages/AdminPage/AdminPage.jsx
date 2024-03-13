import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminUser from "../../compoments/AdminUserComponent/AdminUserComponent/AdminUserComponent";
import AdminProduct from "../../compoments/AdminProductComponent/AdminProductComponent";
import { useNavigate } from "react-router-dom";

function Admin() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  // Sử dụng state để theo dõi lựa chọn hiện tại
  const [selectedTab, setSelectedTab] = useState("users");

  // Hàm để chuyển đổi giữa các tab
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="h-[70px] w-[100%] bg-[rgb(13,116,229)] flex items-center">
        <div className="container flex items-center justify-between">
          <img 
          className="hover:cursor-pointer"
          onClick={() =>navigate("/") }
            src="https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png"
            width="40px"
            height="40px"
            alt=""
          />
          <span className="text-white text-[20px]">{user.name}</span>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-2 border-r-[1px] h-[100vh] p-0 ">
            {/* Sử dụng switch để xác định tab hiện tại */}
            <div onClick={() => handleTabChange("users")}
            className={`hover:cursor-pointer h-[40px] flex items-center hover:bg-[#E9F8FF] w-[100%] pl-4 ${selectedTab === "users" && "text-[#0D74E5] bg-[#E9F8FF]"} `}
            >Người dùng </div>
            <div onClick={() => handleTabChange("products")}
                  className={`hover:cursor-pointer h-[40px] flex items-center hover:bg-[#E9F8FF] w-[100%] pl-4 ${selectedTab === "products" && "text-[#0D74E5] bg-[#E9F8FF]"} `}
            >Sản phẩm</div>
          </div>
          <div className="col-10">
            {/* Sử dụng lựa chọn để hiển thị component tương ứng */}
            {selectedTab === "users" && <AdminUser />}
            {selectedTab === "products" && <AdminProduct />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
