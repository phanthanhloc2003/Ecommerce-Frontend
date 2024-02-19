import axios from "axios";

export const getAllProduct = async (param = {queryParam : {limit: 0, page: 0}}) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll-product`,
    {
      params: param.queryParam
    }
  );

  return res.data;
};
export const addProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/add-product`,data
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/delete-product/${id}`
  );
  return res.data;
};

