import Link from 'next/link'
import { RefreshCw, ArrowRight } from 'lucide-react'

export default function ReturnsPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 text-right">
                    <div className="w-16 h-16 bg-wood-brown/10 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mr-0">
                        <RefreshCw className="text-wood-brown" size={32} />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">سياسة الإرجاع والاستبدال</h1>

                    <div className="prose prose-lg prose-wood-brown max-w-none text-gray-600 space-y-6">
                        <p>
                            في <strong>توب هوم (TOP HOME)</strong>، نضمن لك جودة جميع منتجاتنا. إليك تفاصيل سياسة الإرجاع الخاصة بنا:
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">1. الفحص عند الاستلام</h2>
                        <p>
                            يجب على العميل فحص جميع المنتجات بعناية عند الاستلام بحضور مندوب التوصيل. في حالة وجود أي تلف أو عدم مطابقة، يمكن للعميل رفض الاستلام فوراً.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">2. فترة الإرجاع</h2>
                        <p>
                            بسبب طبيعة الأثاث (خاصة المصنع حسب الطلب)، يتم الإرجاع فقط في حالة وجود عيب مصنعي تم اكتشافه خلال 14 يوماً من تاريخ الاستلام.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">3. شروط الإرجاع</h2>
                        <p>
                            يجب أن يكون المنتج في حالته الأصلية ولم يتم استخدامه بطريقة تؤدي لتلفه خارج نطاق العيب المصنعي المدعى به.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">4. الضمان</h2>
                        <p>
                            جميع منتجاتنا تأتي بضمان لمدة سنتين ضد عيوب الصناعة. لا يشمل الضمان سوء الاستخدام أو التلف الناتج عن عوامل خارجية.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-wood-brown font-bold hover:gap-3 transition-all"
                        >
                            <span>العودة للرئيسية</span>
                            <ArrowRight size={20} className="rotate-180" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
