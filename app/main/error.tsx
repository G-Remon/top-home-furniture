'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-wood-brown mb-4">
                    حدث خطأ غير متوقع
                </h2>
                <p className="text-gray-600 mb-6">
                    نأسف للإزعاج. يرجى المحاولة مرة أخرى.
                </p>
                <div className="space-x-4">
                    <Button onClick={reset} className="bg-wood-brown text-white">
                        حاول مرة أخرى
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/main">
                            العودة للرئيسية
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
