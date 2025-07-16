import api from "./index";

export const createVariant = (data) => api.post(`/variants/create-var`, data);

export const getAllVariant = (params = {}) => {
  return api.get("/variants/get-all-var", { params });
};

export const getVariantsByProductName = (params = {}) => {
  return api.get("/variants/get-by-name", { params });
};

export const updateVariant = async (id, data) =>
  await api.put(`/variants/update-var/${id}`, data);

export const getVariantById = async (id) =>
  api.get(`/variants/get-detail/${id}`);

export const hardDeleteVar = (id) => api.delete(`/variants/delete-var/${id}`);
