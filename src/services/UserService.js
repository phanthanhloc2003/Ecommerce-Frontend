import { axiosJWT } from "../App";

export const loginUser = async (data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,
    data
  );

  return res.data;
};

export const logupUser = async (data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`,
    data
  );

  return res.data;
};

export const getDetailsUser = async (id, token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/get-details/${id}`,
    {
      headers: {
        token: `bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getAllUser = async (token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/getAll`,
    {
      headers: {
        token: `bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const refreshToken = async (refresh) => {
  return axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`,
    {
      withCredentials: true,
      refreshToken: refresh || "",
    }
  );
};

export const updateDataUser = async (id, data, token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${id}`,
    data,
    {
      headers: { token },
    }
  );
  return res.data;
};
export const passWordUser = async (id, data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/passwork/${id}`,
    data
  );

  return res.data;
};
export const uploadImage = async (data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/upload-image`,
    data
  );

  return res.data;
};

export const deleteUser = async (id, token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/delete-user/${id}`,
    {
      headers: {
        token: `bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const createAddress = async (id, data , token) => {
  console.log({id , data , token});
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/address`,data,
    {
      headers: {
        token: `bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateAddress = async (id, data , token) => {
 
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/update-address/${id}`,data,
    {
      headers: {
        token: `bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getDetailsAddress = async (id , token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/detail-address/${id}`,
    {
      headers: {
        token: `bearer ${token}`,
      },
    }
  );
  return res.data.data;
}


export const deleteAddress = async (id , token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/delete-address/${id}`,
    {headers: {
      token: `bearer ${token}`,
    }}
  );
  return res.data.data;
}


