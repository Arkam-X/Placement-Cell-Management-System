import api from "./axios";

export const getCompanies = async () => {
  const res = await api.get("/companies");
  return res.data;
};
