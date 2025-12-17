import api from "./axios";

export const applyForCompany = async() => {
    const res = await api.post("applications/apply", {companyId});
    return res.data;
};

export const getMyApplications = async () => {
  const res = await api.get("/applications/my");
  return res.data;
};