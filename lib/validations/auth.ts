import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: z
    .string()
    .min(1, 'كلمة المرور مطلوبة')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
})

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'الاسم الأول مطلوب')
    .min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل'),
  lastName: z
    .string()
    .min(1, 'اسم العائلة مطلوب')
    .min(2, 'اسم العائلة يجب أن يكون حرفين على الأقل'),
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: z
    .string()
    .min(1, 'كلمة المرور مطلوبة')
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'يجب أن تحتوي على حرف كبير وصغير ورقم'
    ),
  confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  grade: z.number().min(1).max(12).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>