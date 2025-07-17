import api from "./index";

export const getCart = () => api.get("/cart");

export const addItemToCart = (data) => api.post("/cart/add-item", data);

export const removeCartItem = (variantId) =>
  api.delete(`/cart/remove-item/${variantId}`);

export const updateCartItemQuantity = (variantId, newQuantity) =>
  api.put(`/cart/update-item`, { variantId, newQuantity });
