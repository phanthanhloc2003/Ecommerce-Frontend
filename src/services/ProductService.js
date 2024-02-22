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
export const detailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/details-product/${id}`
  );
  return res.data.data;
};


export const UpdateProduct = async (id , data , token) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/product/update-product/${id}`, data,
    {
      headers: {
        token: `beare ${token}`,
      },
    }
  );
  return res.data.data;
};



