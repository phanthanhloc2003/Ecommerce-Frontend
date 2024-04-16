import { axiosJWT } from "../App";


export const createOrder = async (data, token) => {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_URL_BACKEND}/order/create-order`,
      data,
      {
        headers: {
          token: `bearer ${token}`, 
        },
      }
    );
    return res.data.data;
  };



export const getAllOrder = async ( token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/order/getAll-order`,
  
    {
      headers: {
        token: `bearer ${token}`, 
      },
    }
  );
  return res.data.data;
};


export const getDetailsOrder = async (id, token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/order/getDetail-order/${id}`,
  
    {
      headers: {
        token: `bearer ${token}`, 
      },
    }
  );
  return res.data.data;
};