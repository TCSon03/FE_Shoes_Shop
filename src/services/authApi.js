import api from './index';

export const registerApi = (data) => api.post("/users", data);

