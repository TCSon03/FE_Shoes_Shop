import api from "./index";

export const registerApi = (data) => api.post("/register", data);
export const loginApi = (data) => api.post("/login", data);
