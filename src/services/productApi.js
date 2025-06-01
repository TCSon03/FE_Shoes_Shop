import api from "./index";

export const createProduct = (data) => api.post("/products", data);
