import { z } from "zod";

const brandValidation = z.object({
  name: z
    .string()
    .min(3, "Brand tối thiểu 3 kí tự")
    .max(100, "Brand tối đa 100 kí tự")
    .nonempty("Brand không được để trống"),

  logo: z.string().url("Logo phải là một đường dẫn hợp lệ").or(z.literal("")), // chấp nhận chuỗi rỗng

  description: z.string().optional(),

  slug: z.string().nonempty("Slug không được để trống"),
});

export default brandValidation;
