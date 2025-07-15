import { z } from "zod";

export const cateValidation = z.object({
  name: z
    .string()
    .min(3, "Category tối thiểu 3 kí tự")
    .max(100, "Category tối đa 100 kí tự")
    .nonempty("Category không được để trống"),
  logo: z
    .string()
    .url("Logo phải là một đường dẫn hợp lệ")
    .optional()
    .or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  slug: z.string().nonempty("Slug không được để trống"),
});

export default cateValidation;
