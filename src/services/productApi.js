import api from "./index";

export const createProduct = (data) => api.post("/products", data);
export const getAllProduct = () => api.get('/products')
