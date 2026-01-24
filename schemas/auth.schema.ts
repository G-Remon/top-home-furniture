import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'البريد الإلكتروني أو رقم الهاتف مطلوب'),
    password: z.string().min(6, 'كلمة المرور يجب أن لا تقل عن 6 أحرف'),
});

export const registerSchema = z.object({
    fullName: z.string().min(3, 'الاسم يجب أن لا يقل عن 3 أحرف'),
    email: z.string().email('بريد إلكتروني غير صالح'),
    phoneNumber: z.string().min(10, 'رقم الهاتف يجب أن لا يقل عن 10 أرقام'),
    password: z.string().min(6, 'كلمة المرور يجب أن لا تقل عن 6 أحرف'),
    confirmPassword: z.string().min(1, 'يرجى تأكيد كلمة المرور'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export interface AuthResponse {
    userName: string;
    email: string;
    token: string;
}
