import currency from "currency.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  calculateTotalPrice,
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrder,
  totalOrder,
  totalPrice,
} from "../../redux/features/orderSlice/orderSlice";
import { useState } from "react";
import CartEmpty from "../../compoments/CartEmptyComponent/CartEmptyComponent";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertDialogSlide from "../../compoments/DiaLogCompoment/DiaLogComponent";

function OrderPage() {
  const order = useSelector((state) => state.order);
 
  const user = useSelector((state) => state.user);
  const [checkBox, setCheckBox] = useState([]);
  const [discount, setDiscount] = useState("");
  const navigate = useNavigate();
  const [many, setMany] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [address, setAddress] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    setAddress(user.address);
  }, []);

  const handleChangeCount = async (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
      dispatch(calculateTotalPrice({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
      dispatch(calculateTotalPrice({ idProduct }));
    }
  };
  const onchange = (e) => {
    if (checkBox.includes(e.target.value)) {
      const idCheckbok = checkBox.filter((item) => item !== e.target.value);
      setCheckBox(idCheckbok);
    } else {
      setCheckBox([...checkBox, e.target.value]);
    }
  };
  const handlenchangeCheckAll = (e) => {
    if (e.target.checked) {
      const idCheckbok = [];
      order.orderItems.forEach((element) => {
        idCheckbok.push(element.product);
      });
      setCheckBox(idCheckbok);
    } else {
      setCheckBox([]);
    }
  };
  const handleDeleteProduct = (idProduct) =>
    dispatch(removeOrder({ idProduct }));

  const hanleDeleteAllProduct = () => {
    if (checkBox.length >= 1) {
      dispatch(removeAllOrderProduct({ checkBox }));
    }
  };
  useEffect(() => {
    const sum = order.orderItems
      .filter((item) => checkBox.includes(item.product))
      .reduce((acc, arr) => acc + arr.many, 0);
    setMany(sum);
    setDiscount(calculateDiscount(sum));
  }, [checkBox, order.orderItems]);

  const calculateDiscount = (totalAmount) => {
    if (totalAmount === 0) {
      return 0;
    } else if (totalAmount <= 200000) {
      return 20000;
    } else if (totalAmount <= 500000) {
      return 30000;
    } else {
      return 40000;
    }
  };

  const handlePurchase = () => {
    if (user.address.length === 0) {
      navigate("/profile/account/edit/address/create", {
        state: location?.pathname,
      });
    }

    if (checkBox.length > 0) {
      dispatch(
        totalPrice({
          total: {
            id: checkBox,
            many: many,
            discount: discount,
            address: user.address.find(item => item.ischeck === true)
          },
        })
      );
      dispatch(totalOrder({
         id:checkBox
      }))
      navigate("/payment");
    } else {
      setOpen(true);
    }
  };
  const hanldeCloseDialog = () => {
    setOpen(false);
  };
  const result = many - discount;
  return (
    <div className="bg-[#F5F5FA]">
      <div className="container p-[24px]">
        <div className="mb-[12px] flex items-center relative z-[100] w-auto mr-[340px]">
          <h4 className="text-[20px] font-medium m-0 text-gray-900 leading-[28px] uppercase flex-1">
            Giỏ hàng{" "}
          </h4>
        </div>
        {order.orderItems.length <= 0 ? (
          <CartEmpty />
        ) : (
          <div className="flex flex-nowrap justify-between">
            <div className="flex-1 w-[calc(100%-380px)] mr-[20px] ">
              <div className="bg-[#ffffff]  py-[8px] px-[16px] rounded-[4px] font-normal text-[13px] mt-[12px] sticky top-[20px] z-[99] items-center grid  grid-cols-[auto,180px,120px,120px,20px] gap-x-6">
                <label className="flex col-auto">
                  <input
                    onChange={handlenchangeCheckAll}
                    className="mr-[8px]"
                    type="checkbox"
                    checked={checkBox.length === order.orderItems.length}
                  />
                  <span>{`tất cả có (${order.orderItems.length} sản phẩm)`}</span>
                </label>
                <span className="text-gray-500 ">Đơn giá</span>
                <span className=" text-gray-500">số lương</span>
                <span className=" text-gray-500">thành tiền </span>
                <span className=" text-gray-500">
                  <img
                    onClick={hanleDeleteAllProduct}
                    className="cursor-pointer"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                    alt="xoá"
                  />
                </span>
                <div className="absolute w-[100%] top-[32px] bg-[#F5F5FA] h-[10px]"></div>
              </div>
              <div>
                {order.orderItems.map((item, key) => (
                  <div key={key} className="h-auto overflow-hidden">
                    <div className="bg-[#fff] rounded-[4px] mb-[10px] ">
                      <div className="p-[16px] flex items-center">
                        <label className="flex">
                          <input type="checkbox" />
                          <img
                            className="w-[15px] h-[15px] ml-[2px] mr-[6px] "
                            src="https://salt.tikicdn.com/ts/upload/30/24/79/8317b36e87e7c0920e33de0ab5c21b62.png"
                            alt="anhr"
                          />
                        </label>
                      </div>
                      <div className="">
                        <div className="items-center p-[16px] grid grid-cols-[auto,180px,120px,120px,20px] gap-x-6 ">
                          <div className=" ">
                            <div className="grid grid-cols-[18px,80px,1fr] gap-x-[12px] items-center">
                              <div className=" ">
                                <input
                                  type="checkbox"
                                  value={item.product}
                                  onChange={onchange}
                                  checked={checkBox.includes(item.product)}
                                />
                              </div>

                              <a href={`/detail/${item.product}`} className="">
                                <img
                                  className=" w-[80px] object-contain block"
                                  src={`http://localhost:3000/${item.image}`}
                                  alt="ảnh"
                                />
                              </a>
                              <div className="grid gap-y-[4px]">
                                <a
                                  className="text-[14px] font-normal leading-[150%] text-gray-900  line-clamp-2 no-underline"
                                  href={`/detail/${item.product}`}
                                >
                                  {item.name}
                                </a>
                                <p className="text-[12px] font-normal leading-[150%] m-0 text-gray-500">
                                  {" "}
                                  7 Đầu Dây Điện, Keo 3M xịn
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <div className="inline-flex items-center text-[14px] leading-[21px] font-semibold text-gray-900">
                              {currency(item.price, {
                                symbol: "",
                                precision: 0,
                              })
                                .format()
                                .replace(/,/g, ".")}{" "}
                              <sup>₫</sup>
                            </div>
                          </div>
                          <div className="text-[12px] font-normal leading-[150%]">
                            <div className="inline-flex flex-nowrap border-solid border-[1px] border-[#C8C8C8] rounded-[3px] w-[84px]  ">
                              <span
                                onClick={() =>
                                  handleChangeCount("decrease", item.product)
                                }
                                className="inline-block  border-solid border-r-[1px] border-[#C8C8C8] text-[#787878] cursor-pointer w-[24px] h-[24px]"
                              >
                                <img
                                  src="	https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg"
                                  alt="trừ"
                                />
                              </span>
                              <input
                                className="w-[32px] border-none bg-transparent text-center text-[13px] appearance-none outline-none "
                                type="tel"
                                value={item.amount}
                              />
                              <span
                                onClick={() =>
                                  handleChangeCount("increase", item.product)
                                }
                                className="inline-block  border-solid border-l-[1px] border-[#C8C8C8] text-[#787878] cursor-pointer w-[24px] h-[24px]"
                              >
                                <img
                                  src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg"
                                  alt="cộng"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="text-[#FF424E] text-[14px] font-semibold leading-[150%] whitespace-nowrap">
                            {currency(item.many, { symbol: "", precision: 0 })
                              .format()
                              .replace(/,/g, ".")}{" "}
                            <sup>₫</sup>
                          </div>
                          <div className="cursor-pointer ">
                            <img
                              onClick={() => handleDeleteProduct(item.product)}
                              src="	https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                              alt="xoá"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="py-[16px] px-[20px] flex items-center border-solid border-t-[1px] border-[#F2F2F2] ">
                        <div className="inline-flex items-center ">
                          <div className="text-gray-900 text-[15px] font-normal leading-[24px] mr-[12px] whitespace-nowrap">
                            Shop khuyến mãi
                          </div>
                          <div className="text-[14px] text-[#787878] inline-block">
                            Vui lòng chọn sản phẩm trước
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[320px] block">
              <div className="sticky top-[-103px]">
                {address.length > 0 &&
                  address.map((item, index) => {
                    if (item.ischeck) {
                      return (
                        <div className="" key={index}>
                          <div className="rounded-[4px] mb-[12px] relative p-[16px] bg-[rgb(255,255,255)]">
                            <div className="flex items-center justify-between mb-[12px]">
                              <h3 className="text-[rgb(128,128,137)] m-0 font-medium  text-[16px]">
                                Giao tới
                              </h3>
                              <a
                                href="#/"
                                className="text-[rgb(11,116,229)] no-underline"
                              >
                                Thay đổi
                              </a>
                            </div>
                            <div className="flex items-center text-[rgb(56,56,61)] mb-[2px] font-semibold">
                              <p className="m-0 text-[14px]">{item.name}</p>
                              <i className="block w-[1px] h-[20px] mx-[20px] bg-[rgb(235,235,240)]"></i>
                              <p className="m-0 text-[14px]">
                                {item.telephone}
                              </p>
                            </div>
                            <div className="text-[rgb(128,128,137)] ">
                              <span className="text-[rgb(0,171,86)] bg-[rgb(239,255,244)] text-[12px] font-medium leading-[16px] px-[6px] rounded-[100px] mr-[4px] h-[18px] inline-flex items-center">
                                Nhà
                              </span>
                              {`${item?.street}, ${item?.selectedWard} , ${item?.selectedDistrict} , ${item?.selectedProvince}`}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}

                <div className="rounded-[4px] mt-[12px] relative p-[16px] bg-[#fff] mb-[12px]">
                  <div className="flex items-center justify-between text-[13px] leading-[20px] mb-[16px]">
                    <div className="text-gray-900 m-0 capitalize">
                      Tiki Khuyến Mãi
                    </div>
                    <div className="text-[#787878] flex items-center">
                      {`đang chọn (${checkBox.length})`}
                    </div>
                  </div>
                  <div className="mb-[12px] grid gap-[12px]"></div>
                  <div className="flex items-center text-[#0D74E5] text-[13px] cursor-pointer leading-[20px]">
                    <svg
                      className="mr-[8px]"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2803 14.7803L14.7803 10.2803C15.0732 9.98744 15.0732 9.51256 14.7803 9.21967C14.4874 8.92678 14.0126 8.92678 13.7197 9.21967L9.21967 13.7197C8.92678 14.0126 8.92678 14.4874 9.21967 14.7803C9.51256 15.0732 9.98744 15.0732 10.2803 14.7803Z"
                        fill="#0B74E5"
                      ></path>
                      <path
                        d="M10.125 10.5C10.7463 10.5 11.25 9.99632 11.25 9.375C11.25 8.75368 10.7463 8.25 10.125 8.25C9.50368 8.25 9 8.75368 9 9.375C9 9.99632 9.50368 10.5 10.125 10.5Z"
                        fill="#0B74E5"
                      ></path>
                      <path
                        d="M15 14.625C15 15.2463 14.4963 15.75 13.875 15.75C13.2537 15.75 12.75 15.2463 12.75 14.625C12.75 14.0037 13.2537 13.5 13.875 13.5C14.4963 13.5 15 14.0037 15 14.625Z"
                        fill="#0B74E5"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.75 5.25C3.33579 5.25 3 5.58579 3 6V9.75C3 10.1642 3.33579 10.5 3.75 10.5C4.61079 10.5 5.25 11.1392 5.25 12C5.25 12.8608 4.61079 13.5 3.75 13.5C3.33579 13.5 3 13.8358 3 14.25V18C3 18.4142 3.33579 18.75 3.75 18.75H20.25C20.6642 18.75 21 18.4142 21 18V14.25C21 13.8358 20.6642 13.5 20.25 13.5C19.3892 13.5 18.75 12.8608 18.75 12C18.75 11.1392 19.3892 10.5 20.25 10.5C20.6642 10.5 21 10.1642 21 9.75V6C21 5.58579 20.6642 5.25 20.25 5.25H3.75ZM4.5 9.08983V6.75H19.5V9.08983C18.1882 9.41265 17.25 10.5709 17.25 12C17.25 13.4291 18.1882 14.5874 19.5 14.9102V17.25H4.5V14.9102C5.81181 14.5874 6.75 13.4291 6.75 12C6.75 10.5709 5.81181 9.41265 4.5 9.08983Z"
                        fill="#0B74E5"
                      ></path>
                    </svg>
                    <span>Chọn nhập hoặc khuyến mãi khác</span>
                  </div>
                </div>
                <div className="bg-[#fff] rounded-[4px] pb-[8px] ">
                  <ul className="list-none m-0 py-[17px] px-[20px] border-solid border-b-[1px] border-[#F2F2F2]">
                    <li className="flex flex-nowrap mb-[10px] justify-between">
                      <div className="font-light inline-block text-[#333333]">
                        Tạm tính
                      </div>
                      <div className="">
                        {currency(many, { symbol: "", precision: 0 })
                          .format()
                          .replace(/,/g, ".")}{" "}
                        <sup>₫</sup>
                      </div>
                    </li>
                    <li className="flex flex-nowrap mb-[10px] justify-between">
                      <div className="font-light inline-block text-[#333333]">
                        Giảm giá
                      </div>
                      <div className="">
                        {currency(discount, { symbol: "", precision: 0 })
                          .format()
                          .replace(/,/g, ".")}{" "}
                        <sup>₫</sup>
                      </div>
                    </li>
                  </ul>
                  <div className="py-[17px] px-[20px] flex flex-nowrap justify-between m-0">
                    <span className="font-light inline-block text-gray-700">
                      Tổng tiền
                    </span>
                    <div className="text-right ">
                      <div className="text-[#FE3734] text-[15px] font-normal text-right ">
                        {many ? (
                          <span>
                            {currency(result, { symbol: "", precision: 0 })
                              .format()
                              .replace(/,/g, ".")}
                            <sup>₫</sup>
                          </span>
                        ) : (
                          "   Vui lòng chọn sản phẩm"
                        )}
                      </div>
                      <span className=" font-light  block text-[12px] text-[#333333] mt-[3px]">
                        (Đã bao gồm VAT nếu có)
                      </span>
                    </div>
                  </div>
                </div>
                <AlertDialogSlide opens={open} hanleClose={hanldeCloseDialog} />
                <button
                  onClick={handlePurchase}
                  className="mt-[15px] w-[100%] bg-[#FF424E] text-[#fff] py-[13px] px-[10px] text-center rounded-[4px] border-none cursor-pointer block "
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
