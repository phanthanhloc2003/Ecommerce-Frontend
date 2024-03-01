import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,
    data
  );

  return res.data;
};

export const logupUser = async (data) => {
  const res = await axios.post(
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
      }
    }
  );

  return res.data;
};


export const refreshToken = async (refresh) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`, {
        withCredentials: true,
        refreshToken: refresh || ''
      });
    return res.data;
  };

  export const updateDataUser = async (id , data ,token) => {

    const res = await axiosJWT.put(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${id}`,
      data,
      {
        headers:{token}
      }
    );
    return res.data;
  };
  export const passWordUser = async (id , data) => {

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/passwork/${id}`,
      data
    );

    return res.data;
  };
  export const uploadImage = async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/upload-image`,
      data
    );
  
    return res.data;
  };

  export const deleteUser = async (id , token) => {
    const res = await axiosJWT.delete(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/delete-user/${id}`, {
        headers: {
          token: `bearer ${token}`,
        },
      });

    return res.data;
  };
