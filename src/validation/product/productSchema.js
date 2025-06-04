import { z } from "zod";

const productSchema = z.object({
  title: z
    .string()
    .min(6, "Title sản phẩm tối thiếu 6 kí tự!")
    .max(255, "Title sản phẩm tối đa 6 kí tự!"),

  price: z.number().min(1, "Price tối thiểu là 1!"),
  short_description: z
    .string()
    .min(3, "Short Description tối thiểu 3 kí tự!")
    .max(500, "Short Description sản phẩm tối đa 500 kí tự!"),

  long_description: z.string().optional(),
  image_url: z
    .string()
    .url("URL hình ảnh không hợp lệ.")
    .optional()
    .or(z.literal("")),
});

export default productSchema;
