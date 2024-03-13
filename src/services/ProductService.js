import { axiosJWT } from "../App";

export const getAllProduct = async (param = {queryParam : {limit: 0, page: 0 , value:""}}) => {

  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll-product`,
    {
      params: param.queryParam
    }
  );

  return res.data;
};
export const addProduct = async (data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/add-product`,data
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/delete-product/${id}`
  );
  return res.data;
};
export const detailsProduct = async (id) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/details-product/${id}`
  );
  return res.data.data;
};


export const UpdateProduct = async (id, data, token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/update-product/${id}`,
    data,
    {
      headers: {
        token: `bearer ${token}`, 
      },
    }
  );
  return res.data.data;
};


export const deleteMany = async (id, token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/deleteMany`,
    {
      data: id,
      headers: {
        token: `bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getAllType = async()=>{
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll-type`
  );
  return res.data;
}

