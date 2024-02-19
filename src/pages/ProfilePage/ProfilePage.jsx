import { useSelector } from "react-redux";
import {  Route, Routes } from "react-router-dom";

import Notification from "../../compoments/NotificationCompoment/NotificationComponent";
import Account from "../../compoments/AccountComponent/AccountComponent";
import Phone from "../../compoments/PhoneComponent/PhoneComponent";
import Email from "../../compoments/EmailCompoment/EmailComponent";
import Pass from "../../compoments/PassComponnet/PassComponent";
function Profile() {
  const user = useSelector((state) => state.user);
  return (
    <div className="bg-[#F5F5FA]">

<div className="container py-[20px]">
      <div className=" flex items-center mb-[10px]">
        <div className="mr-[5px] items-center ">
          <a
            href="/"
            className="text-gray-500 text-sm leading-5 font-light hover:underline no-underline"
          >
            Trang chủ
          </a>
          <i className="bi bi-chevron-right ml-[5px] text-gray-500 text-sm leading-5 font-light"></i>
        </div>
        <div className="text-gray-500 text-sm leading-5 font-light">
          Thông tin tài khoản
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <div className="">
            <div className="flex items-center ml-[4px] mb-[12px]">
            {user.avata ? (  <img
                className="w-[45px] rounded-[50%] mr-[12px] "
                src={`http://localhost:3000/${user.avata}`}
                alt="avata"
              />): (  <img
                className="w-[45px] rounded-[50%] mr-[12px] "
                src="https://salt.tikicdn.com/desktop/img/avatar.png"
                alt="avata"
              />)}
              <div className="flex-1 text-[13px] leading-[15px] text-gray-700 font-light">
                tải khoản của
                <strong className="block text-[16px] leading-[19px]  font-normal mt-[4px]">
                  {user.name}
                </strong>
              </div>
            </div>
            <ul className="p-0">
              <li className="hover:bg-[#EBEBF0] rounded-[5px] ">
                <a
                  className="py-[7px] px-[18px] flex text-[#9B9B9B] no-underline"
                  href="/profile/account/edit"
                >
                  <i className="bi bi-person-circle mr-[22px]"></i>
                  <span>thông tin tài khoản</span>
                </a>
              </li>
              <li className="hover:bg-[#EBEBF0] rounded-[5px]">
                <a
                  className="py-[7px] px-[18px] flex text-[#9B9B9B] no-underline"
                  href="/profile/Notification"
                >
                  <i className="bi bi-bell-fill  mr-[22px]"></i>
                  <span>thông báo của tôi</span>
                </a>
              </li>
              <li className="hover:bg-[#EBEBF0] rounded-[5px]">
                <a
                  className="py-[7px] px-[18px] flex text-[#9B9B9B] no-underline"
                  href="#/"
                >
                  <i className="bi bi-person-circle mr-[22px]"></i>
                  <span>Quảng lý đơn hàng</span>
                </a>
              </li>
              <li className="hover:bg-[#EBEBF0] rounded-[5px]">
                <a
                  className="py-[7px] px-[18px] flex text-[#9B9B9B] no-underline"
                  href="#/"
                >
                  <i className="bi bi-person-circle mr-[22px]"></i>
                  <span>số địa chỉ</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-9">
          <Routes>
            <Route path="/Notification" element={<Notification />} />
            <Route
              path="/account/edit"
              element={<Account />}
            />
             <Route
              path="/account/edit/phone"
              element={<Phone />}
            />
              <Route
              path="/account/edit/email"
              element={<Email />}
            />
              <Route
              path="/account/edit/pass"
              element={<Pass />}
            />
          </Routes>
         
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Profile;
