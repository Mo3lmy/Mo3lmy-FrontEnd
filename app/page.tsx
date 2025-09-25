'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                منصة التعليم الذكية
              </span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                ابدأ الآن
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            تعلم بذكاء، تفوق بثقة
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            منصة تعليمية متطورة تستخدم الذكاء الاصطناعي لتقديم تجربة تعلم شخصية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              ابدأ رحلة التعلم مجاناً
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              لديك حساب؟ سجل دخولك
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500">
            <p>© 2024 منصة التعليم الذكية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}