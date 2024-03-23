import currency from "currency.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createOrder } from "../../services/OrderSevice";
function Payment() {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [sale, setSale] = useState("");
  const [results, setResults] = useState(0);
  const [sum, setSum] = useState("");
  const result = order.orderItems.filter((item) =>
    order.totalPrice.id.includes(item.product)
  );
  const address = order.totalPrice.address;

  useEffect(() => {
    if (order.totalPrice.id.length > 1) setSale(10000);
    setSum(calculateDiscount(order.totalPrice.many));
    const result =
      order.totalPrice.many - order.totalPrice.discount - sale + sum;

    setResults(result);
  }, []);

  const currentDate = new Date();
  let date = currentDate.getDate() + 5;
  let month = currentDate.getMonth() + 1;
  if (date > new Date(currentDate.getFullYear(), month, 0).getDate()) {
    date -= new Date(currentDate.getFullYear(), month, 0).getDate();
    month++;
    if (month > 12) {
      month = 1;
    }
  }
  const targetDayIndex = (currentDate.getDay() + 5) % 7;
  const days = [
    "chủ nhật",
    "thứ hai",
    "thứ ba",
    "thứ tư",
    "thứ năm",
    "thứ sáu",
    "thứ 7",
  ];
  const currentDay = days[targetDayIndex];
  const formattedDate = String(date).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const calculateDiscount = (totalAmount) => {
    if (totalAmount === 0) {
      return 0;
    } else if (totalAmount <= 200000) {
      return 10000;
    } else if (totalAmount <= 500000) {
      return 20000;
    } else {
      return 30000;
    }
  };
    
  const handleOrder = async () => {
    const shippingAddress =
      order.totalPrice.id.length > 1 ? "giao hàng tiết kiêm" : "";
    const paymentMethod = "thanh toán khi nhận hàng ";
    await createOrder(
      {
        orderItems: order.totalOrder,
        idProduct:  order.totalPrice.id,
        id: user.id,
        paymentMethod: paymentMethod,
        address: address,
        results: results,
        shippingAddress: shippingAddress,
        sale: sale,
        totalOrder: order.totalPrice.many ,
        DeliveryCharges :sum,
        discount: order.totalPrice.discount
      },
      user.access_Token
    );
  };

  return (
    <div className="bg-[#F5F5FA]">
      <div className="container p-[24px]">
        <div className="flex flex-nowrap justify-between">
          <div className="flex-1 w-[calc(100%-380px)] mr-[20px] ">
            <div className="rounded-[4px] relative p-[16px] mb-[16px] bg-[rgb(255,255,255)]">
              <h3 className="mb-[16px] text-[rgb(56,56,61)] font-bold text-[18px] leading-[24px] m-0">
                Chọn hình thức giao hàng
              </h3>
              <div className="w-[479px] relative pb-[16px] mb-[16px]">
                <div className="bg-[rgb(240,248,255)] border-[1px] border-solid border-[rgb(194,225,255)] rounded-[10px] p-[16px] grid gap-y-[12px]">
                  <div className="">
                    <div className="">
                      <label className="flex items-center relative">
                        <input
                          disabled
                          checked={order.totalPrice.id.length > 1}
                          class="form-check-input absolute top-[4px] "
                          type="radio"
                          aria-label="..."
                        />
                        <span className="text-[14px] leading-[20px] flex items-center ml-[25px]">
                          <div className="cursor-pointer py-[4px] ">
                            <div className="py-[2px] ">
                              <span className="text-[14px] leading-[20px] text-[rgb(56,56,61)] ">
                                Giao hàng tiết kiệm
                              </span>
                              <span className="text-[13px] leading-[20px] font-medium inline-flex items-center text-[rgb(0,171,86)] px-[4px] bg-[rgb(255,255,255)] ml-[4px] rounded-[4px]">
                                -10K
                              </span>
                            </div>
                            <span className="text-[12px] text-[#FF424E]">
                              sản phẩm chọn 2 trở lên
                            </span>
                          </div>
                        </span>
                      </label>
                    </div>
                  </div>
                  <img
                    className="z-[1] absolute w-[32px] h-[12px] left-[50%] bottom-[18px] translate-x-[-50%] translate-y-[100%]"
                    src="https://salt.tikicdn.com/ts/upload/05/9e/d8/f13e86df128f19d197397e44924f9616.png"
                    alt="check"
                  />
                </div>
              </div>
              <div className="grid gap-[20px]">
                {result.map((item, key) => (
                  <div
                    key={key}
                    className="w-[100%] rounded-[12px] border-[1px] border-solid border-[rgb(221,221,227)] mt-[20px] pt-[20px] px-[16px] pb-[16px] relative flex"
                  >
                    <div className="flex items-center text-[14px] leading-[20px] text-[rgb(7,148,73)] px-[4px] bg-[rgb(255,255,255)] absolute top-0 left-[12px] translate-y-[-50%]">
                      <div className="flex items-center mr-[8px] ">
                        <img
                          className="w-[24px] h-[24px]"
                          src="	https://salt.tikicdn.com/ts/upload/ad/b7/93/7094a85d0b6d299f30ed89b03511deb9.png"
                          alt="ảnh"
                        />
                        {`gói:${
                          key + 1
                        } , giao ${currentDay}, trước 19h, ${formattedDate}/${formattedMonth}  `}
                      </div>
                    </div>
                    <div className="mr-[45px] max-w-[482px]">
                      <div className="mt-[8px] w-[482px] flex justify-between">
                        <div className="flex items-center ">
                          <span className="text-[12px] leading-[16px] uppercase">
                            Giao hàng tiết kiệm
                          </span>
                        </div>
                        <div className="text-[14px] leading-[20px] flex items-center"></div>
                      </div>
                      <div className="">
                        <div className="">
                          <div className="flex py-[12px] items-center">
                            <div className="mr-[8px] max-h-[48px] shrink-0">
                              <img
                                className="w-[48px] h-[48px] object-contain"
                                src={`http://localhost:3000/${item.image}`}
                                alt=""
                              />
                            </div>
                            <div className="text-[14px] leading-[20px] flex-1 text-[rgb(128,128,137)] ">
                              <div className="flex mb-[4px] pr-[20px] ">
                                <span className="line-clamp-1 ">
                                  {item.name}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <div className="text-[14px] leading-[20px text-[rgb(128,128,137)]]">
                                  {`SL:${item.amount}`}
                                </div>
                                <div className="text-[14px] leading-[20px text-[rgb(128,128,137)]]">
                                  {currency(item.price, {
                                    symbol: "",
                                    precision: 0,
                                  })
                                    .format()
                                    .replace(/,/g, ".")}
                                  <sup>₫</sup>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex w-full items-start bg-[rgb(245,245,250)] rounded-[8px] py-[8px] px-[16px]">
                        <svg
                          className="mr-[8px]"
                          class="fulfillment-icon"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 4.5C3 4.08579 3.33579 3.75 3.75 3.75H10.5C10.9142 3.75 11.25 4.08579 11.25 4.5V6.75H16.5C16.8442 6.75 17.1441 6.98422 17.2276 7.3181L17.8939 9.98345L20.5854 11.3292C20.8395 11.4562 21 11.7159 21 12V16.5C21 16.9142 20.6642 17.25 20.25 17.25H17.25C17.25 18.9069 15.9069 20.25 14.25 20.25C12.5931 20.25 11.25 18.9069 11.25 17.25H10.5C10.0858 17.25 9.75 16.9142 9.75 16.5V5.25H3.75C3.33579 5.25 3 4.91421 3 4.5ZM12.8306 16.7635C12.834 16.7546 12.8372 16.7455 12.8402 16.7364C13.0499 16.1609 13.602 15.75 14.25 15.75C14.898 15.75 15.4501 16.1609 15.6598 16.7364C15.6628 16.7455 15.666 16.7546 15.6694 16.7635C15.7216 16.9161 15.75 17.0797 15.75 17.25C15.75 18.0784 15.0784 18.75 14.25 18.75C13.4216 18.75 12.75 18.0784 12.75 17.25C12.75 17.0797 12.7784 16.9161 12.8306 16.7635ZM16.8487 15.75C16.3299 14.8533 15.3604 14.25 14.25 14.25C13.1396 14.25 12.1701 14.8533 11.6513 15.75H11.25V8.25H15.9144L16.5224 10.6819C16.5755 10.8943 16.7188 11.0729 16.9146 11.1708L19.5 12.4635V15.75H16.8487ZM3 8.25C3 7.83579 3.33579 7.5 3.75 7.5H7.5C7.91421 7.5 8.25 7.83579 8.25 8.25C8.25 8.66421 7.91421 9 7.5 9H3.75C3.33579 9 3 8.66421 3 8.25ZM13.5 9C13.9142 9 14.25 9.33579 14.25 9.75V10.5H15C15.4142 10.5 15.75 10.8358 15.75 11.25C15.75 11.6642 15.4142 12 15 12H13.5C13.0858 12 12.75 11.6642 12.75 11.25V9.75C12.75 9.33579 13.0858 9 13.5 9ZM4.5 12C4.5 11.5858 4.83579 11.25 5.25 11.25H7.5C7.91421 11.25 8.25 11.5858 8.25 12C8.25 12.4142 7.91421 12.75 7.5 12.75H5.25C4.83579 12.75 4.5 12.4142 4.5 12ZM6 15.75C6 15.3358 6.33579 15 6.75 15H7.5C7.91421 15 8.25 15.3358 8.25 15.75C8.25 16.1642 7.91421 16.5 7.5 16.5H6.75C6.33579 16.5 6 16.1642 6 15.75Z"
                            fill="#38383D"
                          ></path>
                        </svg>
                        <div>
                          <p className="text-[14px] leading-[20px] m-0  text-[rgb(128,128,137)]">
                            Được giao bởi TikiNOW Smart
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[320px] block">
            <div className="sticky top-[-103px]">
              <div className="">
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
                    <p className="m-0 text-[14px]">{address.name}</p>
                    <i className="block w-[1px] h-[20px] mx-[20px] bg-[rgb(235,235,240)]"></i>
                    <p className="m-0 text-[14px]">0{address.telephone}</p>
                  </div>
                  <div className="text-[rgb(128,128,137)] text-[14px] ">
                    <span className="text-[rgb(0,171,86)] bg-[rgb(239,255,244)] text-[12px] font-medium leading-[16px] px-[6px] rounded-[100px] mr-[4px] h-[18px] inline-flex items-center">
                      Nhà
                    </span>
                    {address.street}, {address.selectedWard},{" "}
                    {address.selectedDistrict}, {address.selectedProvince}
                  </div>
                </div>
              </div>
              <div className="rounded-[4px] mt-[12px] relative p-[16px] bg-[#fff] mb-[12px]">
                <div className="flex items-center justify-between text-[13px] leading-[20px] mb-[16px]">
                  <div className="text-gray-900 m-0 capitalize">
                    Tiki Khuyến Mãi
                  </div>
                  <div className="text-[#787878] flex items-center">
                    {/* {`đang chọn (${checkBox.length})`} */}
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
                      {currency(order.totalPrice.many, {
                        symbol: "",
                        precision: 0,
                      })
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
                      -
                      {currency(order.totalPrice.discount, {
                        symbol: "",
                        precision: 0,
                      })
                        .format()
                        .replace(/,/g, ".")}{" "}
                      <sup>₫</sup>
                    </div>
                  </li>
                  <li className="flex flex-nowrap mb-[10px] justify-between">
                    <div className="font-light inline-block text-[#333333]">
                      giao hàng tiết kiệm
                    </div>
                    <div className="">
                      -
                      {currency(sale, {
                        symbol: "",
                        precision: 0,
                      })
                        .format()
                        .replace(/,/g, ".")}{" "}
                      <sup>₫</sup>
                    </div>
                  </li>
                  <li className="flex flex-nowrap mb-[10px] justify-between">
                    <div className="font-light inline-block text-[#333333]">
                      phí giao hàng
                    </div>
                    <div className="">
                      +
                      {currency(sum, {
                        symbol: "",
                        precision: 0,
                      })
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
                      <span>
                        {currency(results, { symbol: "", precision: 0 })
                          .format()
                          .replace(/,/g, ".")}
                        <sup>₫</sup>
                      </span>
                    </div>
                    <span className=" font-light  block text-[12px] text-[#333333] mt-[3px]">
                      (Đã bao gồm VAT nếu có)
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleOrder}
                className="mt-[15px] w-[100%] bg-[#FF424E] text-[#fff] py-[13px] px-[10px] text-center rounded-[4px] border-none cursor-pointer block "
              >
                Đặt hàng({order.totalPrice.id.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
