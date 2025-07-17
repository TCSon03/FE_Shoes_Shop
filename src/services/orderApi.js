import api from "./index";

export const createOrder = (data) => api.post("/orders/create", data);

export const getAllOrder = () => api.get("/orders/all");

export const getAllOrdersForAdmin = (params) =>
  api.get("/orders/all-admin", { params });

export const updateOrderStatus = (orderId, data) =>
  api.put(`/orders/${orderId}/status`, data);

export const getOrderDetail = (orderId) => api.get(`/orders/${orderId}`);
