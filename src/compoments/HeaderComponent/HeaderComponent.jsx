import {  useSelector } from "react-redux";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { searchTerm } from "../../redux/features/search/searchSlice";

function HeaderComponent() {
  const user = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const [value , setValue] = useState("");
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    localStorage.clear();
    dispatch(clearUser())
    setAnchorEl(null);
  };
  const handleSearch = () => {
    dispatch(searchTerm(value))
  }


  return (
    <div className="bg-[#ffffff] py-[8px] relative ">
       <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem  >
        <a className="no-underline text-[#333]" href={`/profile/account/edit`}>hồ sơ cá nhân</a>
      </MenuItem>

      {user.isAdmin &&
          <MenuItem onClick={() => {navigate("/system/admin")}} >Đăng sản phẩm</MenuItem>
        }
       
        <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>

      </Menu>
      <div className="container">
        <div className="row items-center">
          <div className="col-sm-2">
            <a href="/">
            <img
              className="h-[72px] w-[72px] text-[#808089]"
              src="https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png"
              alt="logo"
            />
            </a>
          </div>
          <div className="col-sm-6 items-center relative">
            <div className="w-ful relativel border-[1px] border-[#DDDDE2] rounded-[10px] flex h-auto  z-0">
              <div className="mt-[6px] px-[10px] ">
                <i className="bi bi-search"></i>
              </div>
              <input onChange={(e) =>setValue(e.target.value)} className=" flex-1  outline-none" type="text" />

              <button
              onClick={handleSearch}
              className="h-[36px] rounded-r-[10px] hover:bg-[#D2E0FF] z-[1] w-[80px] p-[4px] after:[absolute border-l border-solid border-gray-300 h-[10px] left-0 top-8] whitespace-nowrap">
                tìm kiếm
              </button>
            </div>
            <div className="py-[10px]">
              <a href="#/" className="mr-[10px] text-[#808089] no-underline">
                sale vẫn nhiệt tình
              </a>
              <a href="#/" className="mr-[10px] text-[#808089] no-underline">
                khoẻ đẹp
              </a>
              <a href="#/" className="mr-[10px] text-[#808089] no-underline">
                {" "}
                nhà cửa
              </a>
              <a href="#/" className="text-[#808089] no-underline">
                {" "}
                thể thao
              </a>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="ml-[30px]">
              <div className=" flex ml-[18px] ">
                <div className=" flex py-[8px] px-[16px] items-center rounded-[8px]  hover:bg-[#D2E0FF] hover:cursor-pointer whitespace-nowrap">
                  <span className="mr-[5px]">
                    <i className="bi bi-house-heart"></i>
                  </span>
                  <span>Trang chủ</span>
                </div>

                {user?.name ? ( <div onClick={handleClick} className=" flex py-[8px] px-[16px] items-center rounded-[8px]  hover:bg-[#D2E0FF] hover:cursor-pointer whitespace-nowrap no-underline text-[#333]">
                  <span className="mr-[5px]">
                    <i className="bi bi-emoji-wink"></i>
                  </span>
                <span  >{user?.name}</span>
                
                </div>  ) : (
                    <a href="/login" className=" flex py-[8px] px-[16px] items-center rounded-[8px]  hover:bg-[#D2E0FF] hover:cursor-pointer whitespace-nowrap no-underline text-[#333]">
                    <span className="mr-[5px]">
                      <i className="bi bi-emoji-wink"></i>
                    </span>
                     <span>Tài khoản</span>
                  
                  </a>
                )}
                <div className="flex items-center rounded-[8px]  hover:bg-[#D2E0FF]">
                  <a href="#/" className="text-[20px] px-[8px] relative ">
                    <i className="bi bi-cart"></i>
                    <span className="absolute top-[-8px] text-[12px] text-white bg-[red] rounded-[50%] px-[5px] ">0</span>
                  </a>
                </div>
              </div>
              <div className="flex pt-[10px hover:cursor-pointer mt-[8px] whitespace-nowrap">
                   <span className="text-[#808089] mr-[2px]"><i className="bi bi-geo-alt"></i></span>
                   <p className="text-[#808089] mr-[2px]" >Giao Đến:</p>
                   <p className="font-medium underline">Tiên Mỹ, Tiên Phước, Quảng Nam</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );
}

export default HeaderComponent;
