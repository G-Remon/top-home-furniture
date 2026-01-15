import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-charcoal mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-charcoal mb-2">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-6">
          عذراً، لا يمكن العثور على الصفحة المطلوبة.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-wood-brown text-white rounded-lg hover:bg-wood-brown/90 transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  )
}
