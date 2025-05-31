import { z } from "zod";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username ít nhất 3 kí tự!")
      .max(200, "Username tối đa 200 kí tự!")
      .regex(
        /^[A-Za-z]+$/,
        "Username chỉ chữ, không chứa số và kí tự đặc biệt!"
      ),
    email: z
      .string()
      .email("Email không hợp lê!")
      .min(6, "Email ít nhất 6 kí tự"),
    password: z
      .string()
      .min(6, "Password ít nhất 6 kí tự!")
      .max(50, "Password tối đa 50 kí tự!"),
    confirmpassword: z
      .string()
      .min(6, "confirmpassword ít nhất 6 kí tự!")
      .max(50, "confirmpassword tối đa 50 kí tự"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "ComfirmPassword không khớp!",
    path: ["confirmpassword"],
  });

export default registerSchema;
