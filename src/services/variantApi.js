import api from "./index";

export const createVariant = (data) => api.post(`/products/create-var`, data);

export const getAllVariant = (params = {}) => {
  return api.get("/variants/get-all-var", { params });
};

export const updateVariant = async (id, data) => {
  const res = await api.put(`/variants/update-var/${id}`, data);
  return res.data;
};

export const getVariantById = async (id) => {
  const res = await api.get(`/variants/variants/${id}`);
  return res.data;
};

export const hardDeleteVar = (id) => api.delete(`/variants/delete-var/${id}`);


