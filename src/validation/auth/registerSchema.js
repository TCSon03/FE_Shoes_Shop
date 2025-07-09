import { z } from "zod";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(5, "fullName ít nhất 3 kí tự!")
      .max(100, "fullName tối đa 200 kí tự!"),
    email: z.string().email("Email không hợp lê!"),
    password: z
      .string()
      .min(6, "Password ít nhất 6 kí tự!")
      .regex(/^[A-Z]/, "Mật khẩu phải bắt đầu bằng chữ in hoa")
      .regex(/[^A-Za-z0-9]/, "Mật khẩu phải chứa tối thiểu 1 kí tự đặc biệt"),
    confirmpassword: z.string().min(6, "confirmpassword ít nhất 6 kí tự!"),
    phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
    adress: z
      .object({
        street: z.string().optional(),
        ward: z.string().optional(),
        district: z.string().optional(),
        city: z.string().optional(),
      })
      .optional(),
    avatar: z.string().url("Avatar phải là một đường dẫn hợp lệ").optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    role: z.enum(["member", "manager", "admin", "superAdmin"]).optional(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "ComfirmPassword không khớp!",
    path: ["confirmpassword"],
  });

export default registerSchema;
