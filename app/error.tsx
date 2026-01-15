'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-charcoal mb-4">حدث خطأ ما</h2>
        <p className="text-gray-600 mb-6">
          عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-wood-brown text-white rounded-lg hover:bg-wood-brown/90 transition-colors"
          >
            إعادة المحاولة
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-wood-brown text-wood-brown rounded-lg hover:bg-wood-brown/5 transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
