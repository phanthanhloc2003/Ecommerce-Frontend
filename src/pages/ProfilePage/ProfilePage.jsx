import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Account from "../../compoments/AccountComponent/AccountComponent";
import Phone from "../../compoments/PhoneComponent/PhoneComponent";
import Email from "../../compoments/EmailCompoment/EmailComponent";
import Pass from "../../compoments/PassComponnet/PassComponent";
import Address from "../../compoments/AddressComponent/AddressComponent";
import AddressCreate from "../../compoments/AddressCreateComponent/AddressCreateComponent";
import UpdateAddress from "../../compoments/UpdateAddressComponent/UpdateAddressComponent";
import MyAccount from "../../compoments/NotificationCompoment/NotificationComponent";
import OrderDetails from "../../compoments/OrderDetailsComponent/OrderDetailsComponent";

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
                {user.avata ? (
                  <img
                    className="w-[45px] rounded-[50%] mr-[12px] "
                    src={`http://localhost:3000/${user.avata}`}
                    alt="avata"
                  />
                ) : (
                  <img
                    className="w-[45px] rounded-[50%] mr-[12px] "
                    src="https://salt.tikicdn.com/desktop/img/avatar.png"
                    alt="avata"
                  />
                )}
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
                    className="py-[7px] px-[18px] flex text-[#9B9B9B] no-underline items-center"
                    href="/profile/my-account"
                  >
                    <svg
                    className="mr-[22px]"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path>
                    </svg>
                    <span>Quảng lý đơn hàng</span>
                  </a>
                </li>
                <li className="hover:bg-[#EBEBF0] rounded-[5px]">
                  <a
                    className="py-[7px] px-[18px] flex text-[#9B9B9B] no-underline items-center"
                    href="/profile/account/edit/address"
                  >
                    <svg
                      className="mr-[22px]"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                    </svg>
                    <span>số địa chỉ</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-9">
            <Routes>
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/account/edit" element={<Account />} />
              <Route path="/account/edit/phone" element={<Phone />} />
              <Route path="/account/edit/email" element={<Email />} />
              <Route path="/account/edit/pass" element={<Pass />} />
              <Route path="/account/edit/address" element={<Address />} />
              <Route
                path="/account/edit/address/create"
                element={<AddressCreate />}
              />
              <Route
                path="/account/edit/address/update/:id"
                element={<UpdateAddress />}
              />
              <Route
                path="/account/order/details/:id"
                element={<OrderDetails />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
