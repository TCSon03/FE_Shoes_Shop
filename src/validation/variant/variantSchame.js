import { z } from "zod";

const colors = ["Red", "Blue", "Black", "White", "Green"];
const sizes = [38, 39, 40, 41, 42, 43, 44];

export const variantSchema = z.object({
  productId: z.string().length(24, "Vui lòng chọn sản phẩm hợp lệ"),
  color: z.enum(colors, {
    errorMap: () => ({
      message: `Color phải thuộc một trong: ${colors.join(", ")}`,
    }),
  }),
  size: z
    .string()
    .refine((val) => sizes.map(String).includes(val), {
      message: `Size phải là một trong: ${sizes.join(", ")}`,
    })
    .transform((val) => Number(val)),
  price: z
    .number({
      required_error: "Giá là bắt buộc",
      invalid_type_error: "Giá phải là số",
    })
    .min(1, { message: "Giá phải lớn hơn hoặc bằng 1" }),
  stock: z
    .number({
      invalid_type_error: "Tồn kho phải là số",
    })
    .int()
    .min(0, { message: "Tồn kho không được âm" })
    .optional()
    .default(0),
  image: z.string().url("URL ảnh không hợp lệ").optional(),
});

export const updateVariantSchema = z.object({
  color: z.enum(colors, {
    errorMap: () => ({
      message: `Color phải thuộc một trong: ${colors.join(", ")}`,
    }),
  }),
  size: z
    .string()
    .refine((val) => sizes.map(String).includes(val), {
      message: `Size phải là một trong: ${sizes.join(", ")}`,
    })
    .transform((val) => Number(val)),
  price: z
    .number({
      required_error: "Giá là bắt buộc",
      invalid_type_error: "Giá phải là số",
    })
    .min(1, { message: "Giá phải lớn hơn hoặc bằng 1" }),
  stock: z
    .number({
      invalid_type_error: "Tồn kho phải là số",
    })
    .int()
    .min(0, { message: "Tồn kho không được âm" })
    .optional()
    .default(0),
  image: z.string().url("URL ảnh không hợp lệ").optional(),
});
