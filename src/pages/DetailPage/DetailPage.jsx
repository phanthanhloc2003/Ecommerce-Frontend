import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { detailsProduct } from "../../services/ProductService";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import currency from "currency.js";

function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [number, setNumber] = useState(1);
  const [price, setPrice] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await detailsProduct(id);
    setData(data);
    setValue(data.rating);
  };

  useEffect(() => {
    if (data && data.price) {
      const totalPrice = data.price * number;
      setPrice(totalPrice);
    }
  }, [number, data]);

  const handleAdd = () => {
    setNumber((pre) => {
      return pre + 1;
    });
  };
  const handleApartFrom = () => {
    if (number > 1) {
      setNumber(prevNumber => prevNumber - 1);
    }
  };

  return (
    <div className="bg-[#F5F5FA]">
      <div class="container bg-[#F5F5FA]">
        <div className="py-[10px]">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="text-[18px] font-medium text-[#808089] hover:cursor-pointer"
          >
            Trang chủ
          </span>
          <span> - </span>
          <span> Trang chi tiết sản phầm</span>
        </div>
        <div class="row gap-3">
          <div class="col bg-[#ffffff] flex flex-col w-[400px] sticky top-[16px] gap-[16px] pt-[16px] pb-[12px] ">
            <div className="flex flex-col gap-[8px] px-[16px] ">
              <div className="border-[1px] border-solid border-[#EBEBF0] rounded-[8px] relative">
                <div className="w-[368px] h-[368px]">
                  <div className="relative cursor-pointer">
                    <img
                      className="w-[368px] h-[368px] z-[2] opacity-[1]"
                      src={`http://localhost:3000/${data.image}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-[368px] p-[5px] gap-1 grid grid-cols-[23%] grid-flow-col  overflow-x-auto overscroll-x-contain">
                  <div className="w-[54px] h-[54px] border-[1px] border-[#ccc] border-solid flex items-center justify-center shadow-md">
                    <img
                      className="w-[45px] h-[45px]"
                      src={`http://localhost:3000/${data.image}`}
                      alt=""
                    />
                  </div>

                  <div className="">
                    <div className="w-[54px] h-[54px] border-[1px] border-[#ccc] border-solid flex items-center justify-center shadow-md ">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/${data.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[54px] h-[54px] border-[1px] border-[#ccc] border-solid flex items-center justify-center shadow-md ">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/${data.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[54px] h-[54px] border-[1px] border-[#ccc] border-solid flex items-center justify-center shadow-md">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/${data.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[54px] h-[54px] border-[1px] border-[#ccc] border-solid flex items-center justify-center shadow-md">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/${data.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[54px] h-[54px] border-[1px] border-[#ccc] border-solid flex items-center justify-center shadow-md">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/${data.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[54px] h-[54px] border-[1px] border-[#ccc] border-solid flex items-center justify-center shadow-md">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/${data.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[54px] h-[54px] border-[1px] border-[#ccc] border-solid flex items-center justify-center shadow-md">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/${data.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col bg-[#ffffff]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col rounded-[8px] p-[16px]">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex gap-[8px] items-center">
                      <div>
                        {" "}
                        <img
                          className="w-[89px] h-[20px] opacity-[1]"
                          src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                          alt="chính hảng"
                        />
                      </div>
                      <div className="text-[#242424] text-[13px] font-normal leading-[20px]">
                        Thương hiệu :{" "}
                        <a className="no-underline" href="#/">
                          apple
                        </a>
                      </div>
                    </div>
                    <h1 className="text-[20px] font-medium leading-[150%] mb-[0px]">
                      {" "}
                      {data.name}
                    </h1>
                    <div className="flex items-center justify-between ">
                      <div className="flex">
                        <div className="flex cursor-pointer items-center">
                          <div className="mr-[4px] text-[18px] leading-[150%] font-medium ">
                            5.0
                          </div>
                          <div className="flex ">
                            <div className="relative">
                              <div className="flex items-center leading-3">
                                <Box
                                  sx={{
                                    "& > legend": { mt: 2 },
                                    "& .MuiSvgIcon-root": {
                                      lineHeight: "150%",
                                      fontSize: "1rem",
                                    },
                                  }}
                                >
                                  <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                      setValue(newValue);
                                    }}
                                  />
                                </Box>
                              </div>
                            </div>
                          </div>
                          <a
                            className="block ml-[8px] text-[#787878] no-underline"
                            href="/#"
                          >
                            ({data.countInStock})
                          </a>
                          <div className="w-[1px] h-[12px] bg-[#787878] mx-[8px]"></div>
                        </div>
                        <div className="text-[16px] leading-[24px] text-[#787878]">{`đã bán ${data.countInStock}`}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <div className="flex items-center gap-[8px] text-[#27272A]">
                      <div className="text-[24px] font-semibold leading-[150%]">
                      {currency(data.price, { symbol: '', precision: 0 }).format().replace(/,/g, ".") }
                        <sup className="text-[75%] leading-[0] relative top-[-0.5em]">
                          ₫
                        </sup>
                      </div>
                      <div className="font-normal text-[12px] leading-[150%] px-[4px] bg-[#F5F5FA] rounded-[8px] text-[#27272A]">
                        -8%
                      </div>
                      <div className="">
                        <img
                          className="h-[72px] w-[72px] opacity-[1] object-contain"
                          src="https://salt.tikicdn.com/ts/upload/1c/d0/ac/e89ef64c4a607d248e9e524b69aa1d0c.png"
                          alt="giảm giá sốc"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col bg-[#ffffff]">
            <div className="flex flex-col ">
              <div className="flex flex-col sticky top-[12px] items-stretch gap-[12px]">
                <div className="flex flex-col gap-[16px] rounded-[8px] p-[16px] overflow-visible">
                  <div className="flex gap-[8px] items-center h-[65px] pb-[12px] border-b-[1px] border-[#EBEBF0]">
                    <a href="/#">
                      <img
                        className="max-w-[40px] w-[40px] h-[40px] rounded-[50%] opacity-[1] object-fill"
                        src="https://vcdn.tikicdn.com/cache/w100/ts/seller/21/ce/5c/b52d0b8576680dc3666474ae31b091ec.jpg.webp"
                        alt="tiki"
                      />
                    </a>
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex text-[15px] font-medium leading-[1.6px] text-[#242424] flex-wrap gap-[4px] items-center">
                        <a
                          className="flex flex-1 gap-[4px] items-center no-underline"
                          href="/#"
                        >
                          <span className="text-gray-900  ">TIKI Trading</span>
                          <img
                            className="w-[32px] h-[32px] min-w-[70px] min-h-[20px] opacity-[1] object-contain"
                            src="https://salt.tikicdn.com/cache/w100/ts/upload/6b/25/fb/c288b5bcee51f35f2df0a5f5f03de2e1.png.webp"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="flex items-center gap-[12px] flex-shrink  ">
                        <div className="flex items-center gap-[4px]">
                          <span className="text-[14px] italic font-medium leading-[150%]">
                            5.0
                          </span>
                          <img
                            className="w-[16px] h-[16px]"
                            src="	https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                            alt=""
                          />
                        </div>
                        <div className="text-center text-[14px] font-normal leading-[150%] text-[#808089]">
                          (5.4tr+ đánh giá)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[40px,1fr] gap-[8px] items-center text-[16px] font-normal leading-[150%] text-[#27272A]">
                    <div>
                      <img
                        className="h-[40px] w-[40px] block object-contain "
                        src={`http://localhost:3000/${data.image}`}
                        alt=""
                      />
                    </div>
                    <span className="overflow-hidden flex line-clamp-2 truncate">
                      mày hồng
                    </span>
                  </div>
                  <div className=" flex flex-col gap-[16px]">
                    <div className="flex flex-col gap-[8px]">
                      <div className="grid grid-cols-[1fr] gap-[8px]">
                        <p className="text-[14px] font-semibold m-[0px] leading-[150%]">
                          Số lượng
                        </p>
                        <div className="flex items-center">
                          <button
                            onClick={handleApartFrom}
                            className="flex p-[6px] justify-center items-center border-[1px] border-solid rounded-[4px] hover:bg-[#ECECEC]"
                          >
                            <img
                              className="w-[20px] h-[20px]"
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                              alt=""
                            />
                          </button>
                          <input
                            className="w-[40px] px-[4px] h-[32px] text-[#242424] text-center outline-none transition-all duration-150 ease-in-out border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  border-solid border-[1px] mx-[4px] rounded-[4px] hover:bg-[#ECECEC] "
                            type="text"
                            value={number}
                          />
                          <button
                            onClick={handleAdd}
                            className="flex p-[6px] justify-center items-center border-[1px] border-solid rounded-[4px] hover:bg-[#ECECEC]"
                          >
                            <img
                              className="w-[20px] h-[20px]"
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg
"
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr] gap-[8px] ">
                    <div className="text-[16px] font-semibold leading-[150%] text-[#27272A] ">
                      Tạm tính
                    </div>
                    <div className="flex items-center gap-[8px] text-[24px] font-semibold leading-[150%]">
                      <div>
                        {currency(price, { symbol: '', precision: 0 }).format().replace(/,/g, ".") }
                        <sup className="text-[75%] leading-[0] relative top-[-0.5em]">
                          ₫
                        </sup>
                      </div>
                    </div>
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

export default DetailPage;
