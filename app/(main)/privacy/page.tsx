import Link from 'next/link'
import { Shield, ArrowRight } from 'lucide-react'

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 text-right">
                    <div className="w-16 h-16 bg-wood-brown/10 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mr-0">
                        <Shield className="text-wood-brown" size={32} />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">سياسة الخصوصية</h1>

                    <div className="prose prose-lg prose-wood-brown max-w-none text-gray-600 space-y-6">
                        <p>
                            في <strong>توب هوم (TOP HOME)</strong>، نحن نولي أهمية كبيرة لخصوصية زوارنا وعملائنا. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">1. المعلومات التي نجمعها</h2>
                        <p>
                            نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند إنشاء حساب، أو تقديم طلب، أو التواصل معنا عبر واتساب. تشمل هذه المعلومات الاسم، رقم الهاتف، وعنوان التوصيل.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">2. كيف نستخدم معلوماتك</h2>
                        <p>
                            نستخدم معلوماتك لمعالجة طلباتك، والتواصل معك بشأن حالة الشحن، وتحسين تجربة التسوق الخاصة بك، والرد على استفساراتك.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">3. حماية البيانات</h2>
                        <p>
                            نحن نطبق إجراءات أمنية تقنية وإدارية لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الإفصاح.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">4. تواصل معنا</h2>
                        <p>
                            إذا كان لديك أي أسئلة حول سياسة الخصوصية الخاصة بنا، يمكنك التواصل معنا عبر البريد الإلكتروني info@tophome.com.
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
