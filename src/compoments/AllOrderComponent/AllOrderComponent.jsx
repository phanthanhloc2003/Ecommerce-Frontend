import { useEffect, useState } from "react";
import { getAllOrder } from "../../services/OrderSevice";
import { useSelector } from "react-redux";
import currency from "currency.js";
import { useNavigate } from "react-router-dom";

function AllOrder() {
  const user = useSelector((state) => state.user);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  console.log();
  useEffect(() => {
    const fectGetOrder = async () => {
      const data = await getAllOrder(user.access_Token);
      const orderItems = data.map((item) => {
       return {
        idDonHang: item._id,
        listProducts: item.orderItems,
       }
      });
      setOrder(orderItems);
    };
    fectGetOrder();
  }, []);
  const handleProcessing = (id) => {
    navigate(`/profile/account/order/details/${id}`);
  };
  return (
    <div>
      {order.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full bg-white p-[35px]">
          <img
            className="h-[200px] w-[200px]"
            src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
            alt="ảnh ko có đơn hàng"
          />
          <p className="mt-[15px] text-[16px] font-normal text-[rgb(56,56,61)]">
            Chưa có đơn hàng nào
          </p>
        </div>
      ) : (
        <div>
          {" "}
          {order.map((donHang, key) => {
            return (
              <div
                key={key}
                className="w-full flex flex-col bg-white p-[20px] mb-[20px]"
              >
                 <div className="flex justify-between border-b-[1px] border-solid border-[#E8E8E8] pb-[15px]">
                        <div className="text-[14px] text-white bg-[#EE4D2D] text-center px-[5px] font-normal rounded-[5px]">
                          yêu thích
                        </div>
                        <div className="flex items-center">
                          <div className="text-[#26aa99] text-[14px] font-light">
                            Người gửi đang chuẩn bị hàng
                          </div>
                          <div className="text-[#EE4D2D] text-[14px] font-light border-l-[1px]  border-solid border-[#E0E0E0] ml-[10px] pl-[10px]">
                            {" "}
                            Vận chuyển
                          </div>
                        </div>
                      </div>
                {donHang.listProducts.map((e, i) => {
                  return (
                    <>
                     

                      <div className="flex justify-between py-[10px] border-b-[1px] border-solid border-[#E8E8E8]">
                        <div className="flex">
                          <div className="w-[80px] h-[80px] object-contain mr-[10px]">
                            <img
                              className="w-[100px] h-[80px]  object-contain "
                              src={`http://localhost:3000/${e.image}`}
                              alt="anhr"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <p className="m-0 line-clamp-2 text-[16px] leading-[150%] font-light">
                              {e.name}
                            </p>
                            <span className="text-[15px] font-normal text-gray-400">
                              {" "}
                              x{e.amount}
                            </span>
                            <div className="text-[12px] border-[1px] border-solid border-[#26aa99] text-[#26aa99] px-[2px] rounded-[2px]">
                              {" "}
                              Trả hànng miễn phí 15 ngày
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-[#EE4D2D] font-medium">
                          <div>
                            {currency(e.price, { symbol: "", precision: 0 })
                              .format()
                              .replace(/,/g, ".")}{" "}
                            <sup>₫</sup>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="flex justify-between mt-[10px]">
                  <div className=""></div>
                  <div className="flex">
                    <button className="mr-[20px] text-[#EE4D2D]">
                      huỷ đơn hàng
                    </button>
                    <button
                      onClick={() => handleProcessing(donHang.idDonHang)}
                      className=""
                    >
                      {" "}
                      xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AllOrder;
