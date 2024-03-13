import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProduct, getAllType } from "../../services/ProductService";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import currency from "currency.js";
function ProductType() {
  const [list, setList] = useState([]);
  const { type } = useParams();
  const [value, setValue] = useState(type);
  const [rating, setRating ] = useState("");
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fectType();
  }, [type]);
  const fectType = async () => {
    const data = await getAllType();
    setList(data.data);
  };
  useEffect(() => {
    fectData();
  }, [value]);

  const fectData = async () => {
    const data = await getAllProduct({
      queryParam: { limit: 0, page: 0, value: value },
    });
    setProduct(data.data);
  };
  const handleSearch = (value) => {
    setValue(value);
  };
  
  return (
    <div className="bg-[#F5F5FA]">
      <div className="container">
        <div className="py-[16px]">
          <div className="flex items-center">
            <a
              className="relative flex justify-center items-center text-[#808089] text-[14px] leading-[21px] font-normal whitespace-nowrap no-underline"
              href="/"
            >
              Trang chủ
            </a>
            <span className="ml-[5.5px] mr-[8.5px]">
              <svg
                width="6"
                height="11"
                viewBox="0 0 6 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#808089"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L6.35355 5.64645C6.54882 5.84171 6.54882 6.15829 6.35355 6.35355L1.35355 11.3536C1.15829 11.5488 0.841709 11.5488 0.646447 11.3536C0.451184 11.1583 0.451184 10.8417 0.646447 10.6464L5.29289 6L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                ></path>
              </svg>
            </span>
            <span className="text-[#27272A] relative flex justify-center items-center  text-[14px] leading-[21px] font-normal whitespace-nowrap">
              {value}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start w-full gap-x-[24px] ">
          <div className="w-[240px] flex-shrink-0 block  bg-[#FFFFFF]">
            <div className="w-[240px] rounded-[8px] bg-[#FFFFFF] ">
              <div className="text-[#27272A] text-[14px] font-semibold leading-[150%] py-[12px] px-[16px]  border-b border-solid border-[#EBEBF0]">
                Khám phá theo danh mục
              </div>
            </div>
            {list.map((item, key) => (
              <div
                key={key}
                onClick={() => handleSearch(item)}
                className="flex flex-col"
              >
                <div className="flex flex-col  border-b border-solid border-[#EBEBF0] cursor-pointer ">
                  <div className="py-[8px] px-[16px] items-center gap-[24px] justify-between">
                    {item}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 w-[calc(100%-264px)] flex-col gap-y-[16px]">
            <div className="p-[16px] bg-[#ffffff] rounded-[8px]">
              <h2 className="text-[28px] font-semibold leading-[150%] m-[0px]">
                {value}
              </h2>
              <div className="p-[16px] flex flex-col gap-[12px] rounded-[8px]">
                <div className="w-full relative ">
                  <div className="overflow-hidden">
                    <div className="transition-all duration-500 ease-in-out gap-[8px] inline-flex ">
                      {product.map(item =>(
                         <div key={item._id} className="w-[176px]">
                         <div className="h-[100%] w-[100%] ">
                           <a
                             className=" no-underline flex relative cursor-pointer overflow-hidden h-[100%]"
                             href={`/detail/${item._id}` }
                           >
                             <span className="w-full flex text-gray-900 flex-col border-[1px] border-solid border-[#EBEBF0] rounded-[8px] overflow-hidden  ">
                               <div className="flex-shrink-0 text-center relative w-[100%] pt-[100%]">
                                 <div className="absolute  top-[0] left-0 w-full h-full ">
                                   <div className="text-center">
                                     <img
                                       className=" w-full h-full opacity-[1] block object-contain"
                                       src={`http://localhost:3000/${item.image}`}
                                       alt="ảnh "
                                     />
                                   </div>
                                 </div>
                               </div>
                               <div className="flex flex-col justify-between p-[8px] gap-[4px] flex-1  ">
                                 <div className="flex flex-col gap-[4px] flex-1 justify-between flex-wrap max-h-[44px] overflow-hidden ">
                                   <div className="">
                                     <img
                                       className="w-[74px] h-[20px] opacity-[1] object-contain  "
                                       src="https://salt.tikicdn.com/ts/upload/0f/27/42/1fff0f8fe6125514354597d1c5f5260c.png"
                                       alt="ảnh"
                                     />
                                   </div>
                                   <div className="">
                                     <img
                                       className="w-[89px] h-[20px] opacity-[1] object-contain  "
                                       src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png"
                                       alt="ảnh"
                                     />
                                   </div>
                                 </div>
                                 <div className="flex flex-col gap-[4px]">
                                   <div className="flex flex-col gap-[4px] h-[40px]">
                                     <h3 className="line-clamp-2 items-stretch overflow-hidden  text-[12px] font-normal leading-[150%] m-[0px]  ">
                                     {item.name}
                                     </h3>
                                     <div className="flex h-[12px]">
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
                                    value={item.rating}
                                    onChange={(event, newValue) => {
                                      setRating(newValue);
                                    }}
                                  />
                                </Box>
                                     </div>
                                   </div>
                                 </div>
                                 <div className="">
                                   <div className="text-left text-[16px] leading-[150%] font-normal m-0 flex items-center text-gray-900">
                                     <div className="text-left text-[16px] leading-[150%] font-normal text-gray-900">
                                     {currency(item.price, { symbol: '', precision: 0 }).format().replace(/,/g, ".") }
                                       <sup className="top-[-0.5em] text-[75%] relative align-baseline ">
                                         ₫
                                       </sup>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </span>
                           </a>
                         </div>
                       </div>
                      ))}
                     
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

export default ProductType;
