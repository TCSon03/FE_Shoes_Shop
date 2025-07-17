import api from "./index";

export const createVnpayPaymentUrl = (data) => api.post("/payment/vnpay/create_payment_url", data);