import api from "./axios";

export const addCompany = async (data) => {
  const res = await api.post("/companies", data);
  return res.data;
};

export const getApplicants = async (companyId) => {
  const res = await api.get(`/applications/company/${companyId}`);
  return res.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const res = await api.put(`/applications/${applicationId}/status`, { status });
  return res.data;
};
