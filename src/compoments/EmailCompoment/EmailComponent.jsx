import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsUser, updateDataUser } from "../../services/UserService";
import { updateUser } from "../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Email() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const [email , setEmail] = useState("")
   useEffect(() =>{
    setEmail(user.email)
   },[user])
   const handleUpload = async (e) => {
    try {
        if(isValidEmail(email)){
            e.preventDefault();
            const data = await updateDataUser(user?.id, { email });
            handleGetDetailsUser(user.id, user.access_Token);
            navigate("/profile/account/edit")
        }
    else{
        return  console.log(`${email} không phải là địa chỉ email hợp lệ.`);
    }
    
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, token }));
  };

  const  isValidEmail =(email)=> {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return (
    <div className="flex-1">
      <div className="text-[20px] leading-[32px] font-light mt-[4px] mb-[12px]">
        Cập nhật Email
      </div>
      <div className="bg-[#FFFFFF] py-[30px] px-[20px] flex justify-center rounded-[8px]">
        <form className="w-[400px] p-[16px] border-[1px] border-[#EBEBF0] rounded-[4px]">
          <div className="flex flex-col mb-[34px]">
            <label className="text-[14px] mb-[4px] text-[#38383D]">
          Email
            </label>
            <div className="flex z-[1px] flex-1 relative">
              <div className="w-[100%]">
                <img
                  className="absolute w-[24px] left-[10px] top-[50%] transform -translate-y-1/2"
                  src="	https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png"
                  alt=""
                />
                <input
                  className="pl-[40px] w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                  type="email" 
                  value={email}
                  
                  onChange={(e)=> setEmail(e.target.value)}
                
                  placeholder="nhập số điện thoại"
                />
              </div>
            </div>
          </div>
          <button onClick={handleUpload} className="w-[100%] h-[40px] border-[0px] rounded-[4px] text-[#FFFFFF] text-[14px] bg-[#0D74E5] cursor-pointer">Lưu và thay dổi</button>
        </form>
      </div>
    </div>
  );
}

export default Email;