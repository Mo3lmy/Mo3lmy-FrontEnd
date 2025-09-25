import api from './client'
import type { AuthResponse } from '@/types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  grade?: number
}

export const authAPI = {
  // تسجيل الدخول
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // api.post already returns data because of interceptor
    return await api.post('/auth/login', credentials)
  },
  
  // إنشاء حساب جديد
  register: async (data: RegisterData): Promise<AuthResponse> => {
    // api.post already returns data because of interceptor
    return await api.post('/auth/register', data)
  },
  
  // جلب بيانات المستخدم الحالي
  getMe: async () => {
    return await api.get('/auth/me')
  },
  
  // تحديث كلمة المرور
  changePassword: async (oldPassword: string, newPassword: string) => {
    return await api.post('/auth/change-password', {
      oldPassword,
      newPassword,
    })
  },
  
  // التحقق من التوكن
  verifyToken: async (token: string) => {
    return await api.post('/auth/verify', { token })
  },
}