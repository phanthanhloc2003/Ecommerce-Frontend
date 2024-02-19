function ProductCompoment(props) {

  const {countInStock,description,image,name,price,rating,type,discount,selled} = props;

  return (
    <a href="/detail/:id" className=" col mt-[40px] no-underline">
      <div className="flex flex-col   m-[3px] p-[10px] bg-[#fff] rounded-[8px] border border-solid border-gray-300">
        <div>
          <img
            className="w-[100%] h-[100%]"
            src={`http://localhost:3000/${image}`}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-[89px] h-[20px] opacity-100"
            src="	https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png"
            alt=""
          />
        </div>
        <div>
          <p className="text-[12px] line-clamp-2 overflow-hidden">
      {name}
          </p>
        </div>

        <div className="flex">
          <div className="flex items-center">
            {rating}
            <i className="bi bi-star-fill text-yellow-500 text-[12px]"></i>
           
          </div>

          <div className="text-gray-500 font-normal text-xs leading-6 ml-[4px] pl-[5px]">đã bán {discount || 10}</div>
        </div>
        <div className="flex items-center">
          <div className="text-left text-lg leading-6 font-medium text-gray-800">
            <span>{price}</span>
            <sup>₫</sup>
          </div>
          <div className="inline-block h-[18px] ml-[4px] px-[2px] bg-gray-200 rounded-full text-gray-800 text-sm font-medium leading-[125%]">{selled || 10}%</div>
        </div>
      </div>
    </a>
  );
}

export default ProductCompoment;