import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lê!")
    .min(6, "Email ít nhất 6 kí tự"),
  password: z
    .string()
    .min(6, "Password ít nhất 6 kí tự!")
    .max(50, "Password tối đa 50 kí tự!"),
});
export default loginSchema;
