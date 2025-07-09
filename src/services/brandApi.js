import api from "./index";

export const createBrand = (data) => api.post("/brand/create-brand", data);
