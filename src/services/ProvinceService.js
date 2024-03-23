import axios from "axios";

export const apiProvinces = async () => {
    const res = await axios.get(
      "https://vapi.vnappmob.com/api/province"
    );
    return res.data;
  };
  
export const apiProvincesDistrict = async (id) => {
  const res = await axios.get(
    `https://vapi.vnappmob.com/api/province/district/${id}`
  );
  return res.data;
};

export const apiProvincesWard = async (id) => {
  const res = await axios.get(
    `https://vapi.vnappmob.com/api/province/ward/${id}`
  );
  return res.data;
};
