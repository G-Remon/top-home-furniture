import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-wood-brown mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    الصفحة غير موجودة
                </h2>
                <p className="text-gray-600 mb-8">
                    عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
                </p>
                <Button asChild className="bg-wood-brown text-white">
                    <Link href="/main">
                        العودة للرئيسية
                    </Link>
                </Button>
            </div>
        </div>
    );
}
