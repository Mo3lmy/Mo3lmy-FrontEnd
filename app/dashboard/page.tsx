'use client'

import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  // Custom logout function
  const handleLogout = () => {
    // مسح كل البيانات
    localStorage.clear()
    
    // إعادة تعيين الـ store
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    })
    
    // رسالة وداع
    toast.success('تم تسجيل الخروج بنجاح')
    
    // التوجيه للصفحة الصحيحة
    router.push('/auth/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">منصة التعليم الذكية</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 hover:text-red-700"
          >
            تسجيل الخروج
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              مرحباً {user.firstName} {user.lastName} 👋
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>البريد الإلكتروني:</strong> {user.email}
              </p>
              <p className="text-gray-600">
                <strong>الصف الدراسي:</strong> الصف {user.grade || 'غير محدد'}
              </p>
              <p className="text-gray-600">
                <strong>نوع الحساب:</strong> {user.role === 'STUDENT' ? 'طالب' : user.role}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">📚</div>
              <h3 className="font-semibold">المواد الدراسية</h3>
              <p className="text-gray-600 text-sm mt-1">تصفح المواد والدروس</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-semibold">التقدم</h3>
              <p className="text-gray-600 text-sm mt-1">تابع تقدمك الدراسي</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">💬</div>
              <h3 className="font-semibold">المساعد الذكي</h3>
              <p className="text-gray-600 text-sm mt-1">اسأل واحصل على المساعدة</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}