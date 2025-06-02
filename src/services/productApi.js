import api from "./index";

export const createProduct = (data) => api.post("/products", data);
export const getAllProduct = () => api.get("/products");
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const getDetailProduct = (id) => api.get(`/products/${id}`);
