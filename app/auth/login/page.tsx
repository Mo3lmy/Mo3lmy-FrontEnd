'use client'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">تسجيل الدخول</h1>
          <p className="text-gray-600 mt-2">أدخل بياناتك للوصول إلى المنصة</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@email.com"
              dir="ltr"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">تذكرني</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              نسيت كلمة المرور؟
            </a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold"
            onClick={(e) => {
              e.preventDefault();
              alert('جاري تسجيل الدخول...');
            }}
          >
            تسجيل الدخول
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ليس لديك حساب؟{' '}
            <a href="/auth/register" className="text-blue-600 hover:underline font-semibold">
              سجل الآن
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}