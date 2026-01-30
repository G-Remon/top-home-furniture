import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 text-right">
                    <div className="w-16 h-16 bg-wood-brown/10 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mr-0">
                        <FileText className="text-wood-brown" size={32} />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">الشروط والأحكام</h1>

                    <div className="prose prose-lg prose-wood-brown max-w-none text-gray-600 space-y-6">
                        <p>
                            مرحباً بك في <strong>توب هوم (TOP HOME)</strong>. باستخدامك لموقعنا، فإنك توافق على الالتزام بالشروط والأحكام التالية:
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">1. استخدام الموقع</h2>
                        <p>
                            الموقع مخصص لعرض وبيع منتجات الأثاث المنزلي. يجب عليك استخدام الموقع بطريقة قانونية ولا تنتهك حقوق الآخرين.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">2. الأسعار والمنتجات</h2>
                        <p>
                            نحن نسعى جاهدين لضمان دقة الأسعار والأوصاف، ومع ذلك قد تحدث أخطاء. نحتفظ بالحق في تصحيح أي أخطاء وإلغاء الطلبات المتأثرة بها.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">3. حقوق الملكية</h2>
                        <p>
                            جميع المحتويات الموجودة على هذا الموقع، بما في ذلك الصور والنصوص والشعارات، هي ملك لـ توب هوم ومحمية بموجب قوانين الملكية الفكرية.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">4. التوصيل والتركيب</h2>
                        <p>
                            تخضع مواعيد التوصيل لتوفر المنتج وموقع العميل. يتم التنسيق للتركيب مع فريق فني متخصص لضمان جودة الخدمة.
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
