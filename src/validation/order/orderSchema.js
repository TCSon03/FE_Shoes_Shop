import { z } from "zod";

export const orderValidation = z.object({
  phoneNumber: z.string().min(10, "Số điện thoại không hợp lệ"),
  paymentMethod: z.enum(["COD", "VNPAY"]),
  notes: z.string().optional(),
  shippingAddress: z.object({
    street: z.string().min(1, "Bắt buộc"),
    ward: z.string().min(1, "Bắt buộc"),
    district: z.string().min(1, "Bắt buộc"),
    city: z.string().min(1, "Bắt buộc"),
  }),
});

export const orderStatusSchema = z
  .object({
    status: z.enum([
      "pendding",
      "processing",
      "shipped",
      "delivered",
      "received",
      "cancelled",
    ]),
    cancelReason: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.status === "cancelled") {
        return data.cancelReason && data.cancelReason.trim() !== "";
      }
      return true;
    },
    {
      message: "Vui lòng nhập lý do khi hủy đơn",
      path: ["cancelReason"],
    }
  );
