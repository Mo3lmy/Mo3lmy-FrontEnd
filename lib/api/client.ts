import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - إضافة التوكن
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - يرجع response.data مباشرة
api.interceptors.response.use(
  // ⚠️ مهم: هنا نرجع response.data مباشرة وليس response كاملاً
  (response) => response.data,
  (error) => {
    // معالجة الأخطاء
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/auth/login'
    }
    
    // إرجاع رسالة خطأ واضحة
    const message = 
      error.response?.data?.error?.message || 
      error.response?.data?.message ||
      'حدث خطأ غير متوقع'
    
    return Promise.reject({
      code: error.response?.data?.error?.code || 'UNKNOWN_ERROR',
      message,
      status: error.response?.status,
    })
  }
)

export default api