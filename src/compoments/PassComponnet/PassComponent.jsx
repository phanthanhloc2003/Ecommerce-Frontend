import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  passWordUser
} from "../../services/UserService";
import { updateUser } from "../../redux/features/user/userSlice";

function Pass() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [current, setCurrent] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      await passWordUser(user.id, { current , newPassword,password});
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex-1">
      <div className="text-[20px] leading-[32px] font-light mt-[4px] mb-[12px]">
        Cập nhật mật khẩu
      </div>
      <div className="bg-[#FFFFFF] py-[30px] px-[20px] flex justify-center rounded-[8px]">
        <form className="w-[400px] p-[16px] border-[1px] border-[#EBEBF0] rounded-[4px]">
          <div className="flex flex-col mb-[34px]">
            <label className="text-[14px] mb-[4px] text-[#38383D]">
              mật khẩu hiện tại
            </label>
            <div className="flex z-[1px] flex-1 relative">
              <div className="w-[100%]">
                <img
                  onClick={handleTogglePassword}
                  className="absolute w-[24px] right-[10px] top-[50%] transform -translate-y-1/2"
                  src={`${
                    showPassword
                      ? "https://frontend.tikicdn.com/_desktop-next/static/img/account/eye-splash.png"
                      : "https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png"
                  }`}
                  alt=""
                />
                <input
                  className="pr-[35px] w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                  type={showPassword ? "text" : "password"}
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  placeholder="nhập mật khẩu hiên tại"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-[34px]">
            <label className="text-[14px] mb-[4px] text-[#38383D]">
              Mật khẩu mới
            </label>
            <div className="flex z-[1px] flex-1 relative">
              <div className="w-[100%]">
                <img
                  onClick={handleTogglePassword}
                  className="absolute w-[24px] right-[10px] top-[50%] transform -translate-y-1/2"
                  src={`${
                    showPassword
                      ? "https://frontend.tikicdn.com/_desktop-next/static/img/account/eye-splash.png"
                      : "https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png"
                  }`}
                  alt=""
                />
                <input
                  className="pr-[35px] w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="nhập mật khẩu mới "
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-[34px]">
            <label className="text-[14px] mb-[4px] text-[#38383D]">
              Nhập lại mật khẩu mới
            </label>
            <div className="flex z-[1px] flex-1 relative">
              <div className="w-[100%]">
                <img
                  className="absolute w-[24px] right-[10px] top-[50%] transform -translate-y-1/2"
                  src={`${
                    showPassword
                      ? "https://frontend.tikicdn.com/_desktop-next/static/img/account/eye-splash.png"
                      : "https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png"
                  }`}
                  alt=""
                />
                <input
                  className="pr-[35px] w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="nhập lại mật khẩu mới"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleUpload}
            className="w-[100%] h-[40px] border-[0px] rounded-[4px] text-[#FFFFFF] text-[14px] bg-[#0D74E5] cursor-pointer"
          >
            Lưu và thay dổi
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pass;
