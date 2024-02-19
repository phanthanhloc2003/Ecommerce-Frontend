import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getDetailsUser, updateDataUser, uploadImage } from "../../services/UserService";
import { updateUser } from "../../redux/features/user/userSlice";

function Account() {
  const user = useSelector((state) => state.user);
  const [hidden, setHidden] = useState(true);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);
  const dispatch = useDispatch();
  const [avatar, setavatar] = useState(null);
  const inputFileRef = useRef(null);
  const openInputFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
      inputFileRef.current.click();
    }
  };

  useEffect(() => {
    setavatar(user.avata);
    setName(user.name);
    setNickname(user.nickname);
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
   
    setImage(file);
    setHidden(true);
  };

  const openUpdateImage = () => {
    setHidden(false);
  };
  const cloesUpdateImage = () => {
    setHidden(true);
  };

  const handleUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("avatar", image);
      formData.append("username", user.email);
      const res = await uploadImage(formData);
      handleGetDetailsUser(res.data, user.access_Token);
    }
    if(nickname){
      const data = await updateDataUser(user?.id, { nickname });
      handleUploadnickname(user.id, user.access_Token);
    }
  };
  const handleUploadnickname = async (id , token) => {
    const res = await getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, token }));

  }

  const handleGetDetailsUser = async (data, token) => {
    dispatch(updateUser({ ...data, token }));
  };
  return (
    <div>
      <div className="text-[20px] leading-[32px] font-light mt-[6px]">
        <p>Thông tin tài khoản</p>
      </div>
      <div className="bg-[#FFFFFF] rounded-[10px]">
        <div className="flex  justify-between">
          <div className="w-[553px] py-[16px] pr-[24px] pl-[16px]">
            <span className="text-[16px] leading-[24px] font-normal text-[#64646D]">
              Thông tin cá nhân
            </span>
            <div className="rounded-[4px] mt-[16px]">
              <form className="w-[100%]">
                <div className="flex - flex-row">
                  <div className="mr-[16px]">
                    <div className="w-[112px] h-[112px]  bg-[#EFF8FF] z-[1000px] rounded-[50%] border-[4px] border-solid border-blue-200 relative flex justify-center items-center">
                      <div
                        className="w-[16px] h-[16px]  bg-[#333] absolute  rounded-[10px] right-[3px] bottom-[5px] flex justify-center items-center hover:cursor-pointer"
                        onClick={openUpdateImage}
                      >
                        <img
                          className="w-[10px] h-[10px]"
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/account/edit.png"
                          alt=""
                        />
                      </div>
                      <div className="flex items-center justify-center w-full h-full">
                        {user.avata ? (
                          <div className=" ">
                            <img
                              className="h-[105px] rounded-[50%] "
                              src={`http://localhost:3000/${avatar}`}
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="w-[50px] h-[50px] mb-[4px]">
                            <img
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png"
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] flex justify-between flex-col">
                    <div className="flex items-center mb-[34px]">
                      <label className="w-[110px] max-w-[110px] text-[14px] text-[#333333] mr-[16px]">
                        Họ & tên{" "}
                      </label>
                      <div className="flex flex-1 relative z-[1]">
                        <input
                          className="w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center mb-[34px]">
                      <label className="w-[110px] max-w-[110px] text-[14px] text-[#333333] mr-[16px]">
                        Nick name{" "}
                      </label>
                      <div className="flex flex-1 relative z-[1]">
                        <input
                          className="w-[100%] border-solid  border-[1px] outline-none rounded-[4px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-[36px] py-[10px] px-[12px]"
                          placeholder="nhập nick name"
                          type="text"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-[34px]">
                  <label className="w-[110px] max-w-[110px] mr-[16px]">
                    Ngày sinh
                  </label>
                  <div className="flex flex-1 relative z-[1]">
                    <select className="w-[100px] h-[34px] border border-gray-300 py-[6px] px-[12px] leading-[34px] outline-none rounded-[4px]  mr-[12px] bg-center shadow-none">
                      <option>ngày</option>
                    </select>
                  </div>
                  <div className="flex flex-1 relative z-[1]">
                    <select className="w-[100px] h-[34px] border border-gray-300 py-[6px] px-[12px] leading-[34px] outline-none rounded-[4px]  mr-[12px] bg-center shadow-none">
                      <option>tháng</option>
                    </select>
                  </div>{" "}
                  <div className="flex flex-1 relative z-[1]">
                    <select className="w-[100px] h-[34px] border border-gray-300 py-[6px] px-[12px] leading-[34px] outline-none rounded-[4px]  mr-[12px] bg-center shadow-none">
                      <option>năm</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center mb-[34px]">
                  <label className="w-[110px] max-w-[110px] mr-[16px]">
                    Giới tính
                  </label>
                  <label className="flex mr-[15px] cursor-pointer items-center">
                    <input className=" " type="radio" />
                    <span></span>
                    <span className="ml-[10px] text-[13px] flex items-center leading-[20px]">
                      nam
                    </span>
                  </label>
                  <label className="flex mr-[15px] cursor-pointer items-center">
                    <input className=" " type="radio" />
                    <span></span>
                    <span className="ml-[10px] text-[13px] flex items-center leading-[20px]">
                      nữ
                    </span>
                  </label>
                  <label className="flex mr-[15px] cursor-pointer items-center">
                    <input className=" " type="radio" />
                    <span></span>
                    <span className="ml-[10px] text-[13px] flex items-center leading-[20px]">
                      khác
                    </span>
                  </label>
                </div>
                <div className=" flex items-center mb-[34px]">
                  <label className="w-[110px] max-w-[110px] mr-[16px]">
                    Quốc tịch
                  </label>
                  <div className="flex flex-1 relative z-[1]">
                    <input
                      className="pr-[35px] border outline-none  w-[100%] h-[36px] leading-[20px] transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  py-[10px] px-[12px] rounded-[4px]"
                      type="text"
                      placeholder="chọn quốc tịch"
                    />
                    <i className="bi bi-chevron-down absolute right-[-65px] top-1/2 transform -translate-y-1/2 w-24 "></i>
                  </div>
                </div>

                <div className="flex items-center mb-[34px]">
                  <label className="w-[110px] max-w-[110px] mr-[16px]"></label>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleUpload}
                  >
                    Lưu và thây dổi
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="border-l border-solid border-gray-300 mb-[16px]"></div>
          <div className="w-full lg:w-[calc(100%-553px)] py-[16px] pl-[24px] pr-[16px] flex flex-col">
            <span>số điện thoại và email</span>
            <div className="bg-white rounded-[10px] mb-[16px]">
              <div className="flex w-[100%] py-[19px] items-center justify-center ">
                <div>
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <span className="ml-[6px]">số điện thoại</span>
                  <span className="ml-[6px]">{user.phone}</span>
                </div>
                <div className="flex-1 flex justify-between ">
                  <span></span>
                  <button className="border-[1px] border-solid border-[#0D74E5] bg-white h-[28px] rounded-[4px] text-[14px] cursor-pointer px-[12px] text-[#0D74E5]">
                    <a
                      className="no-underline"
                      href="/profile/account/edit/phone"
                    >
                      cập nhật
                    </a>
                  </button>
                </div>
              </div>
              <div className="flex w-[100%] py-[19px] items-center justify-center border-t border-solid border-gray-300 ">
                <div>
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <span className="ml-[6px]">địa chỉ emmail</span>
                  <span className="ml-[6px]">{user.email}</span>
                </div>
                <div className="flex-1 flex justify-between ">
                  <span></span>
                  <button className="border-[1px] border-solid border-[#0D74E5] bg-white h-[28px] rounded-[4px] text-[14px] cursor-pointer px-[12px] text-[#0D74E5]">
                    <a
                      className="no-underline"
                      href="/profile/account/edit/email"
                    >
                      cập nhật
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <span>Bảo mật</span>
            <div className="bg-white rounded-[10px] mb-[16px]">
              <div className="flex w-[100%] py-[19px] items-center justify-center ">
                <div>
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/lock.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <span className="ml-[6px]">Đổi mật khẩu</span>
                </div>
                <div className="flex-1 flex justify-between ">
                  <span></span>
                  <button className="border-[1px] border-solid border-[#0D74E5] bg-white h-[28px] rounded-[4px] text-[14px] cursor-pointer px-[12px] text-[#0D74E5]">
                    <a
                      className="no-underline"
                      href="/profile/account/edit/pass"
                    >
                      cập nhật
                    </a>
                  </button>
                </div>
              </div>
              <div className="flex w-[100%] py-[19px] items-center justify-center border-t border-solid border-gray-300 ">
                <div>
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://salt.tikicdn.com/ts/upload/99/50/d7/cc0504daa05199e1fb99cd9a89e60fa5.jpg
                    "
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <span className="ml-[6px]">Thiết Lập mã pin</span>
                </div>
                <div className="flex-1 flex justify-between ">
                  <span></span>
                  <button className="border-[1px] border-solid border-[#0D74E5] bg-white h-[28px] rounded-[4px] text-[14px] cursor-pointer px-[12px] text-[#0D74E5]">
                    cập nhật
                  </button>
                </div>
              </div>
            </div>
            <span>Liên Kết mạng xã hội</span>
            <div className="bg-white rounded-[10px] mb-[16px]">
              <div className="flex w-[100%] py-[19px] items-center justify-center ">
                <div>
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/facebook.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <span className="ml-[6px]">Facebook</span>
                </div>
                <div className="flex-1 flex justify-between ">
                  <span></span>
                  <button className="border-[1px] border-solid border-[#0D74E5] bg-white h-[28px] rounded-[4px] text-[14px] cursor-pointer px-[12px] text-[#0D74E5]">
                    cập nhật
                  </button>
                </div>
              </div>
              <div className="flex w-[100%] py-[19px] items-center justify-center border-t border-solid border-gray-300 ">
                <div>
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/google.png
                    "
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <span className="ml-[6px]">Google</span>
                </div>
                <div className="flex-1 flex justify-between ">
                  <span></span>
                  <button className="border-[1px] border-solid border-[#0D74E5] bg-white h-[28px] rounded-[4px] text-[14px] cursor-pointer px-[12px] text-[#0D74E5]">
                    cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`${
            hidden ? "hidden" : ""
          } fixed bg-[#787878] bg-opacity-30 inset-0 overflow-y-scroll z-[1000] transition ease-in duration-500`}
        >
          <div className="relative inset-0 border-none bg-white overflow-hidden rounded-[20px] outline-none p-[24px] w-[650px] mx-auto my-[80px]">
            <div className="relative w-[100%]">
              <div className="border-b-[1px] border-solid border-[#EBEBF0] flex flex-row justify-between items-center p-[16px] mb-[24px]">
                <span className="font-normal text-[16px] leading-[24px]">
                  cập nhật ảnh đại diện
                </span>
                <img
                  onClick={cloesUpdateImage}
                  className="w-[36px] h-[36px] bg-none border-none  cursor-pointer"
                  src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
                  alt=""
                />
              </div>
              <div className="w-[600px] h-[600px]">
                <input
                  className="hidden"
                  ref={inputFileRef}
                  type="file"
                  enctype="multipart/form-data"
                  name="avatar"
                  onChange={handleFileChange}
                />
                <div className="h-[100%] w-[100%] p-[20px] bg-[#F5F5FA] ">
                  <div
                    className="flex justify-center items-center text-center  rounded-[8px] border-dashed border-[2px] border-gray-300 h-[100%]"
                    onClick={openInputFile}
                  >
                    <span className="text-[16px] text-[#0D74E5]">
                      {" "}
                      nhấn chọn hoặc kéo thả vào khung này
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
