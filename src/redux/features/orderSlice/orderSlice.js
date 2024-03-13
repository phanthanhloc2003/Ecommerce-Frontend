import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paiAt: "",
  isDelivered: false,
  deliveredAt: "",
};
export const searchSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, actions) => {
    const { orderItems} = actions.payload
     const itemOrder = state?.orderItems.find((item) => item?.product === orderItems.product )
   
     if(itemOrder){
        itemOrder.amount += orderItems?.amount
     }
     else{
        state?.orderItems.push(orderItems)
     }
    },
    increaseAmount:(state , actions )=>{
      const {idProduct} = actions.payload
      const itemOrder = state?.orderItems.find((item) => item?.product ===  idProduct )
        itemOrder.amount ++
    },
    decreaseAmount:(state , actions )=>{
      const {idProduct} = actions.payload
      const itemOrder = state?.orderItems.find((item) => item?.product ===  idProduct )
      if(itemOrder.amount > 1){
        itemOrder.amount --
      }
       

    },
    removeOrder: (state , actions) => {
        const {idProduct} = actions.payload
        const itemOrder = state?.orderItems.filter((item) => item?.product !==  idProduct )
        state.orderItems = itemOrder
    },
    removeAllOrderProduct:(state , actions) => {
      const {checkBox} = actions.payload
      const itemOrder = state?.orderItems.filter((item) => !checkBox.includes(item.product) )
      state.orderItems = itemOrder
    },
    calculateTotalPrice:(state , actions) => {
      const {idProduct} = actions.payload
      const itemOrder = state?.orderItems.find((item) => item?.product ===  idProduct )
      itemOrder.many = itemOrder.amount * itemOrder.price
    },
    
  },
});

export const { addOrder ,increaseAmount,decreaseAmount,removeOrder ,removeAllOrderProduct ,calculateTotalPrice} = searchSlice.actions;
export default searchSlice.reducer;
