import SlickImages from "../../compoments/SlickImages/SlickImages";
import imgage1 from "../../acssets/imgaes/photo-1.jpg.webp";
import imgage2 from "../../acssets/imgaes/photo-2.jpeg";
import imgage3 from "../../acssets/imgaes/photo-3.jpeg";
import imgage4 from "../../acssets/imgaes/photo-4.jpeg";
import ProductCompoment from "../../compoments/ProductComponent/ProductCompoment";
// import {
//   useQuery
// } from '@tanstack/react-query'
import { getAllProduct } from "../../services/ProductService";
import { useQuery } from "react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

function HomePage() {
  const [limitProduct, setLimitProduct] = useState(8);
  const value = useSelector((state) => state.search);
  const fecchProductAll = async (param) => {
    const res = await getAllProduct(param.queryKey[1]);
    return res;
  };
  const { data: product } = useQuery(
    {
      queryKey: [
        "product",
        { queryParam: { limit: limitProduct, page: 0, value: value.value } },
      ],
      queryFn: fecchProductAll,
    },
    { retry: 3, retryDelay: 1000 }
  );
  const handleXemThem = () => {
    setLimitProduct((prev) => prev + 8);
  };

  return (
    <div className="bg-[#F5F5FA]">
      <div className="container">
        <div className="mb-[40px]">
          <SlickImages imgaes={[imgage1, imgage2, imgage3, imgage4]} />
        </div>
        <div className=" g-2 flex flex-wrap ">
          {product?.data.map((product) => {
            return (
              <ProductCompoment
                key={product._id}
                id={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                discount={product.discount}
                selled={product.selled}
              />
            );
          })}
        </div>
        <div className=" block text-center mt-[20px] ">
        <button
          onClick={handleXemThem}
          className="   bg-[#FFA07A] hover:bg-[#FF7F50] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Xem thêm
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
