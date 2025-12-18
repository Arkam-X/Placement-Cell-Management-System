import api from "./axios";

export const applyForCompany = async (companyId) => {
  const res = await api.post("/applications/apply", {companyId});
  return res.data;
};

export const getMyApplications = async () => {
  const res = await api.get("/applications/my");
  return res.data;
};

// export const applyToCompany = async (companyId) => {
//   const res = await api.post("/applications/apply", {
//     companyId, // 👈 MUST be exactly this
//   });
//   return res.data;
// };
