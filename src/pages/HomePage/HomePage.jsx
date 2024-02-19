import HeaderComponent from "../../compoments/HeaderComponent/HeaderComponent";
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

function HomePage() {

  const [limitProduct, setLimitProduct] = useState(8);
  const fecchProductAll = async (param) => {
    const res = await getAllProduct(param.queryKey[1]);
    return res;
  };
  const { data: product } = useQuery(
    {
      queryKey: ["product", { queryParam: { limit: limitProduct, page: 0 } }],
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
        <div className="row g-2 flex flex-wrap ">
          {product?.data.map((product) => {
            return (
              <ProductCompoment
                key={product._id}
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
        <button onClick={handleXemThem}>xem thêm</button>
      </div>
    </div>
  );
}

export default HomePage;
