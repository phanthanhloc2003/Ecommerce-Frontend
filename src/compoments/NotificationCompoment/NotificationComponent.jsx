import { useState } from "react";
import AllOrder from "../AllOrderComponent/AllOrderComponent";
import WaitForPay from "../WaitForPayComponent/WaitForPayComponent";
import Processing from "../ProcessingComponent/ProcessingComponent";
import BeingTransported from "../BeingTransportedComponent/BeingTransportedComponent";
import Delivered from "../DeliveredComponent/DeliveredComponent";
import Canceled from "../CanceledComponent/CanceledComponent";


function MyAccount() {
  const [selectedTab, setSelectedTab] = useState("all-order");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className="flex-1">
      <div className="max-w-[950px]">
        <div className="text-[19px] leading-[21px] font-light mt-[20px] mb-[15px] ">
          Đơn hàng của tôi
        </div>
        <div className="cursor-pointer bg-[rgb(255,255,255)] w-full flex flex-row overflow-hidden sticky top-0 z-10">
          <div
            onClick={() => handleTabChange("all-order")}
            className={`w-[16.6667%] py-[12px] text-center text-[rgb(13,92,182)] border-b-[2px] border-solid ${
              selectedTab === "all-order"
                ? "border-[rgb(13,92,182)]"
                : "border-transparent"
            } transition-colors duration-300`}
          >
            Tất cả đơn
          </div>
          <div
            onClick={() => handleTabChange("WaitForPay")}
            className={`w-[16.6667%] py-[12px] text-center text-[rgb(13,92,182)] border-b-[2px] border-solid ${
              selectedTab === "WaitForPay"
                ? "border-[rgb(13,92,182)]"
                : "border-transparent"
            } transition-colors duration-300`}
          >
            Chờ thanh toán
          </div>
          <div  onClick={() => handleTabChange("Processing")}  className={`w-[16.6667%] py-[12px] text-center text-[rgb(13,92,182)] border-b-[2px] border-solid ${
              selectedTab === "Processing"
                ? "border-[rgb(13,92,182)]"
                : "border-transparent"
            } transition-colors duration-300`}>
            Đang sử lý
          </div>
          <div onClick={() => handleTabChange("BeingTransported")}  className={`w-[16.6667%] py-[12px] text-center text-[rgb(13,92,182)] border-b-[2px] border-solid ${
              selectedTab === "BeingTransported"
                ? "border-[rgb(13,92,182)]"
                : "border-transparent"
            } transition-colors duration-300`}>
            Đang vận chuyển
          </div>
          <div  onClick={() => handleTabChange("Delivered")}   className={`w-[16.6667%] py-[12px] text-center text-[rgb(13,92,182)] border-b-[2px] border-solid ${
              selectedTab === "Delivered"
                ? "border-[rgb(13,92,182)]"
                : "border-transparent"
            } transition-colors duration-300`}>
            Đã giao
          </div>
          <div onClick={() => handleTabChange("Canceled")}   className={`w-[16.6667%] py-[12px] text-center text-[rgb(13,92,182)] border-b-[2px] border-solid ${
              selectedTab === "Canceled"
                ? "border-[rgb(13,92,182)]"
                : "border-transparent"
            } transition-colors duration-300`}>
            Đã huỷ
          </div>
        </div>
        <div className="w-full relative my-[12px] ">
          <i className="bi bi-search absolute left-[10px] top-[50%]  translate-y-[-53%] w-[24px] h-[24px] "></i>

          <input
            className="w-[100%] h-[36px] rounded-[4px] py-[10px] pl-[40px] pr-[18px] leading-[20px] outline-none border-[1px] border-solid border-[rgb(196,196,207)]  hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
            type="text"
            placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
          />
          <div className="absolute right-[10px] top-[50%] translate-y-[-50%] text-[rgb(11,116,227)]  border-l-[2px] border-solid border-[rgb(221,221,227)] pr-[6px] pl-[16px] cursor-pointer ">
            tìm đơn hàng
          </div>
        </div>
        <div className="h-auto overflow-auto flex flex-col min-h-[calc(-110px+100vh)]">
          <div className="">
          {selectedTab === "all-order" && <AllOrder/>}
          {selectedTab === "WaitForPay" && <WaitForPay/>}
          {selectedTab === "BeingTransported" && <BeingTransported/>}
          {selectedTab === "Processing" && <Processing/>}
          {selectedTab === "Delivered" && <Delivered/>}
          {selectedTab === "Canceled" && <Canceled/>}
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
