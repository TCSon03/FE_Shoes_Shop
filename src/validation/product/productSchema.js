import { z } from "zod";

export const createProductValidate = z.object({
  name: z
    .string()
    .min(3, { message: "Product tối thiểu 3 kí tự" })
    .max(100, { message: "Product tối đa 100 kí tự" })
    .nonempty({ message: "Product không được để trống" }),
    
  thumbnail: z
    .string()
    .url({ message: "Thumbnail phải là một đường dẫn hợp lệ" })
    .or(z.literal("")),

  description: z.string().optional(),

  slug: z
    .string()
    .nonempty({ message: "Slug không được để trống" }),

  brandId: z
    .string()
    .nonempty({ message: "Brand là bắt buộc" }),

  categoryId: z
    .string()
    .nonempty({ message: "Category là bắt buộc" }),
});
