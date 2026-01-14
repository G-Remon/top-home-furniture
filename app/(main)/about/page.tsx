// app/(main)/about/page.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Users, Truck, Shield, Sparkles, ArrowLeft } from 'lucide-react'

const features = [
    {
        icon: Award,
        title: 'جودة عالية',
        description: 'نستخدم أفضل المواد والخامات في تصنيع أثاثنا',
    },
    {
        icon: Users,
        title: 'فريق محترف',
        description: 'فريق من المصممين والحرفيين ذوي الخبرة',
    },
    {
        icon: Truck,
        title: 'توصيل سريع',
        description: 'خدمة توصيل وتركيب احترافية لجميع المحافظات',
    },
    {
        icon: Shield,
        title: 'ضمان شامل',
        description: 'ضمان على جميع المنتجات لراحة بالك',
    },
]

const stats = [
    { value: '15+', label: 'سنة خبرة' },
    { value: '10000+', label: 'عميل راضٍ' },
    { value: '500+', label: 'منتج فريد' },
    { value: '50+', label: 'معرض' },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-off-white">
            
            {/* Hero Section */}
            <section className="pt-24 md:pt-32 pb-12 md:pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-wood-brown/10 
                                      text-wood-brown rounded-full text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>من نحن</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight">
                            علامة رائدة في عالم
                            <span className="text-wood-brown"> الأثاث الفاخر</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            توب هوم هي علامة تجارية رائدة في صناعة الأثاث الفاخر في مصر والشرق الأوسط.
                            نقدم تصميمات أنيقة وعصرية تجمع بين الجمال والراحة والجودة العالية
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 md:py-16 bg-wood-brown relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="/images/geld.png"
                        alt="pattern"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-white/90 text-sm md:text-base">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-wood-brown/10 
                                          text-wood-brown rounded-lg text-sm font-medium mb-4">
                                قصتنا
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-6 leading-tight">
                                رحلة من الشغف
                                <br />
                                إلى التميز
                            </h2>
                            
                            <div className="space-y-4 text-gray-600 leading-relaxed text-base md:text-lg">
                                <p>
                                    بدأت رحلتنا منذ أكثر من 15 عامًا برؤية واضحة: تقديم أثاث فاخر يجمع بين
                                    التصميم العصري والجودة العالية بأسعار مناسبة
                                </p>
                                <p>
                                    نؤمن بأن كل منزل يستحق أن يكون مميزًا، ولذلك نعمل باستمرار على تطوير
                                    تصميماتنا واستخدام أفضل المواد لضمان رضا عملائنا
                                </p>
                                <p>
                                    اليوم، نفخر بخدمة آلاف العملاء في جميع أنحاء مصر والشرق الأوسط، ونستمر
                                    في النمو والتطور لنكون الخيار الأول للأثاث الفاخر
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-off-white rounded-lg border border-gray-200">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-sm font-medium text-charcoal">مصنوع في مصر</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-off-white rounded-lg border border-gray-200">
                                    <div className="w-2 h-2 rounded-full bg-wood-brown" />
                                    <span className="text-sm font-medium text-charcoal">جودة عالمية</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                                <Image
                                    src="/images/geld.png"
                                    alt="TOP HOME"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>

                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-wood-brown/10 flex items-center justify-center">
                                        <Award className="w-6 h-6 text-wood-brown" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-charcoal">15+</div>
                                        <div className="text-xs text-gray-600">سنة خبرة</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
                            لماذا توب هوم؟
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            نقدم لك تجربة فريدة في عالم الأثاث الفاخر
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="group text-center p-6 md:p-8 rounded-2xl bg-off-white 
                                             hover:bg-white hover:shadow-xl transition-all duration-300
                                             border border-transparent hover:border-wood-brown/20"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="w-16 h-16 mx-auto mb-5 rounded-xl bg-wood-brown/10 
                                                 flex items-center justify-center
                                                 group-hover:bg-wood-brown group-hover:text-white
                                                 transition-all duration-300"
                                    >
                                        <Icon className="w-8 h-8 text-wood-brown group-hover:text-white transition-colors" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-wood-brown transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative bg-wood-brown rounded-3xl p-8 md:p-12 lg:p-16 text-center 
                                 text-white overflow-hidden"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <Image
                                src="/images/geld.png"
                                alt="pattern"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                جاهز لتحويل منزلك؟
                            </h2>
                            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                                تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا
                            </p>
                            
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-wood-brown 
                                         rounded-xl font-bold text-lg hover:bg-white/95 
                                         transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                            >
                                <span>تواصل معنا الآن</span>
                                <ArrowLeft className="w-5 h-5" />
                            </Link>

                            <p className="text-white/70 text-sm mt-4">
                                ✓ استشارة مجانية | ✓ رد سريع | ✓ خدمة احترافية
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}