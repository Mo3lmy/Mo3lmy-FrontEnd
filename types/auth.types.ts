import { z } from 'zod'

// Validation schemas
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
    .min(1, 'الاسم الأخير مطلوب')
    .min(2, 'الاسم الأخير يجب أن يكون حرفين على الأقل'),
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
      'يجب أن تحتوي على حرف كبير وحرف صغير ورقم'
    ),
  confirmPassword: z
    .string()
    .min(1, 'تأكيد كلمة المرور مطلوب'),
  grade: z
    .number()
    .min(1, 'الصف الدراسي مطلوب')
    .max(12, 'الصف الدراسي غير صحيح')
    .optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
})

// Types
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'STUDENT' | 'TEACHER' | 'ADMIN'
  grade?: number
}

export interface AuthResponse {
  success: boolean
  data: {
    user: User
    token: string
  }
  message: string
}