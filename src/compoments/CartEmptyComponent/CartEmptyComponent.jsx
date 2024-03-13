function CartEmpty() {
    return (
        <div className="bg-[#fff] rounded-[8px] w-[100%] py-[16px] flex items-center flex-col">
            <img src="https://salt.tikicdn.com/ts/upload/43/fd/59/6c0f335100e0d9fab8e8736d6d2fbcad.png" width="160" height="160" alt="empty" />
            <p className="text-[16px] font-semibold leading-[150%] text-[rgb(39,39,42)] mt-[12px] mb-[2px]  ">Giỏ hàng trống</p>
            <p className="text-[14px] font-normal leading-[150%] m-0  text-[rgb(39,39,42)] ">Bạn tham khảo thêm các sản phẩm được Tiki gợi ý bên dưới nhé!</p>

        </div>
      );
}

export default CartEmpty;