import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import {
  apiProvinces,
  apiProvincesDistrict,
  apiProvincesWard,
} from "../../services/ProvinceService";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, getDetailsUser } from "../../services/UserService";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/features/user/userSlice";

function AddressCreate() {
  const user = useSelector((state) => state.user);
  const [value, setValue] = useState("Nhà riêng / Chung cư");
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [telephone, setTelephone] = useState("");
  const [street, setStreet] = useState("");
  const [ischeck, setIsCheck] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const provinceData = await apiProvinces();
      setProvince(provinceData.results);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeProvince = async (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedProvinceId = event.target.value;
    setSelectedProvince(selectedOption.dataset.name);
    const districtData = await apiProvincesDistrict(selectedProvinceId);
    setDistrict(districtData.results);
  };

  const handleChangeDistrict = async (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedOption.dataset.name);
    const wardData = await apiProvincesWard(selectedDistrictId);
    setWard(wardData.results);
  };

  const handleChangeWard = (event) => {
    const selectedWardName = event.target.value;
    setSelectedWard(selectedWardName);
  };
  const handleCheck = (event) => {
    setIsCheck(event.target.checked);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await createAddress(
        user.id,
        {
          name,
          company,
          telephone,
          street,
          selectedProvince,
          selectedDistrict,
          selectedWard,
          value,
          ischeck,
        },
        user.access_Token
      );

      handleGetDetailsUser(user.id, user.access_Token);
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/profile/account/edit/address");
      }
    } catch (error) {
      console.log("sad", error);
      setError(error.response.data);
    }
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, token }));
  };

  return (
    <div className="flex-1">
      <div className="">
        <div className="text-[19px] leading-[21px] font-light mt-[20px] mb-[15px]">
          Tạo sổ địa chỉ
        </div>
        <div className="bg-[#fff] rounded-[4px] min-h-[400px] py-[30px] px-[20px]">
          <form className="w-[600px]" onSubmit={handleSubmit}>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 ">
                Họ và tên
              </label>
              <div className="flex flex-1 relative z-[1]">
                <input
                  className="flex-1 rounded-[4px] h-[34px] py-[6px] px-[12px] leading-[34px]  outline-none  border-solid  border-[1px]  border-gray-300 transition-all duration-150 ease-in-out hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                  type="text"
                  placeholder="nhập họ và tên"
                  maxLength="50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 ">
                Công Ty
              </label>
              <div className="flex flex-1 relative z-[1]">
                <input
                  className="flex-1 rounded-[4px] h-[34px] py-[6px] px-[12px] leading-[34px]  outline-none  border-solid  border-[1px]  border-gray-300 transition-all duration-150 ease-in-out hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                  type="text"
                  placeholder="nhập Công Ty"
                  maxLength="50"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 ">
                Số Điện Thoại
              </label>
              <div className="flex flex-1 relative z-[1]">
                <input
                  className="flex-1 rounded-[4px] h-[34px] py-[6px] px-[12px] leading-[34px]  outline-none  border-solid  border-[1px]  border-gray-300 transition-all duration-150 ease-in-out hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                  type="text"
                  placeholder="nhập Số Điện Thoại"
                  maxLength="50"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 ">
                Tỉnh/Thành Phố:
              </label>
              <div className="flex flex-1 relative z-[1]">
                <select
                  onChange={handleChangeProvince}
                  className="w-[100%]  border-solid  border-[1px]  border-gray-300  h-[34px] py-[6px] px-[12px]  outline-none rounded-[4px] shadow-none "
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {province.map((item) => (
                    <option
                      key={item.province_id}
                      data-name={item.province_name}
                      value={item.province_id}
                    >
                      {item.province_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 ">
                Quận huyện
              </label>
              <div className="flex flex-1 relative z-[1]">
                <select
                  onChange={handleChangeDistrict}
                  className="w-[100%]  border-solid  border-[1px]  border-gray-300  h-[34px] py-[6px] px-[12px]  outline-none rounded-[4px] shadow-none "
                >
                  <option value="">Chọn quận huyện</option>
                  {district.map((item) => (
                    <option
                      key={item.district_id}
                      data-name={item.district_name}
                      value={item.district_id}
                    >
                      {item.district_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 ">
                Phường xã
              </label>
              <div className="flex flex-1 relative z-[1]">
                <select
                  onChange={handleChangeWard}
                  className="w-[100%]  border-solid  border-[1px]  border-gray-300  h-[34px] py-[6px] px-[12px]  outline-none rounded-[4px] shadow-none "
                >
                  <option value="">Chọn Phường xã</option>
                  {ward.map((item) => (
                    <option key={item.ward_id} value={item.ward_name}>
                      {item.ward_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 ">
                Địa chỉ
              </label>
              <div className="flex flex-1 relative z-[1]">
                <textarea
                  className="w-[100%]  border-solid  border-[1px]  border-gray-300  py-[6px] px-[12px]  rounded-[4px]"
                  rows="2"
                  placeholder="nhập địa chỉ"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 ">
                Loại địa chỉ:
              </label>
              <RadioGroup
                className="flex flex-row"
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Nhà riêng / Chung cư"
                  control={<Radio />}
                  label="Nhà riêng / Chung cư"
                  className="mr-4" // Khoảng cách giữa các nút radio
                />
                <FormControlLabel
                  value="Cơ quan / Công ty"
                  control={<Radio />}
                  label="Cơ quan / Công ty"
                  className="mr-4 text-[13px]" // Khoảng cách giữa các nút radio
                />
              </RadioGroup>
            </div>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 "></label>
              <label className=" flex items-center">
                <input
                  onChange={handleCheck}
                  className="mr-[10px] h-[18px] w-[18px]"
                  type="checkbox"
                />
                <span>Đặt làm địa chỉ mặt định</span>
                {error && (
                  <span className="ml-[40px] text-[14px] font-light text-[#B51700]">
                    /{error}
                  </span>
                )}
              </label>
            </div>
            <div className="flex items-center mb-[15px]">
              <label className="w-[110px] min-w-[110px] text-[13px] text-gray-900 "></label>
              <button className="border-0 w-[146px] h-[40px] rounded-[4px] text-[#4A4A4A] text-[14px] cursor-pointer bg-[#FDD836] ">
                cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddressCreate;
