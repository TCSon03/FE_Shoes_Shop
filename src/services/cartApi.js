import api from "./index";

export const getCart = () => api.get("/cart");

export const addItemToCart = (data) => api.post("/cart/add-item", data);

export const removeCartItem = (variantId) =>
  api.delete(`/cart/remove-item/${variantId}`);
