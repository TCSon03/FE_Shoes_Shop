import api from "./index";

export const createProduct = (data) => api.post("/products/create-pro", data);
export const getAllProduct = (page = 1, limit = 5, search = "") => {
  return api.get("/products/", {
    params: { page, limit, search },
  });
};
export const deleteProduct = (id) => api.delete(`/products/delete-pro/${id}`);
export const updateProduct = (id, data) =>
  api.put(`/products/update-pro/${id}`, data);
export const getDetailProduct = (id) => api.get(`/products/${id}`);

export const softDeletePro = (id) => api.delete(`/products/sort-pro/${id}`);

export const getSoftDeletedPro = () => api.get("/products/get-soft");

export const restorePro = (id) => api.put(`/products/restore-pro/${id}`);

export const hardDeletePro = (id) => api.delete(`/products/delete-pro/${id}`);
