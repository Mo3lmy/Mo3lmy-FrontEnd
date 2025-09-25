import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - إضافة التوكن
api.interceptors.request.use(
  (config) => {
    // جلب التوكن من localStorage
    const token = localStorage.getItem('token')
    
    // إضافة التوكن للـ headers إذا موجود
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Debugging: طباعة الـ request
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers,
    })
    
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor - معالجة الـ response والأخطاء
api.interceptors.response.use(
  (response) => {
    // Debugging: طباعة الـ response
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    })
    
    // إرجاع البيانات مباشرة (بدون wrapper)
    return response.data
  },
  (error) => {
    // طباعة تفاصيل الخطأ
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    })
    
    // معالجة حالة 401 (Unauthorized)
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized - Redirecting to login...')
      localStorage.removeItem('token')
      localStorage.removeItem('auth-storage')
      
      // تحويل للـ login فقط إذا مش في صفحة login أصلاً
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/auth/login'
      }
    }
    
    // استخراج رسالة الخطأ
    let errorMessage = 'حدث خطأ غير متوقع'
    
    if (error.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    
    // معالجة أخطاء الشبكة
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'انتهت مهلة الاتصال، حاول مرة أخرى'
    } else if (error.code === 'ERR_NETWORK') {
      errorMessage = 'لا يوجد اتصال بالخادم'
    }
    
    // إرجاع خطأ موحد
    return Promise.reject({
      code: error.response?.data?.error?.code || error.code || 'UNKNOWN_ERROR',
      message: errorMessage,
      status: error.response?.status,
      details: error.response?.data,
    })
  }
)

export default api