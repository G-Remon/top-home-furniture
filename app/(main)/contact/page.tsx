// app/(main)/contact/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Sparkles } from 'lucide-react'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const contactInfo = [
    {
        icon: Phone,
        title: 'الهاتف',
        details: ['+20 123 456 7890', '+20 100 123 4567'],
        href: 'tel:+201234567890',
    },
    {
        icon: Mail,
        title: 'البريد الإلكتروني',
        details: ['info@tophome.com', 'sales@tophome.com'],
        href: 'mailto:info@tophome.com',
    },
    {
        icon: MapPin,
        title: 'العنوان',
        details: ['القاهرة، مصر', 'شارع التحرير، المعادي'],
    },
    {
        icon: Clock,
        title: 'ساعات العمل',
        details: ['السبت - الخميس: 9 صباحاً - 9 مساءً', 'الجمعة: 2 ظهراً - 10 مساءً'],
    },
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            })

            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus('idle'), 3000)
        }, 1500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-off-white">
            
            {/* Hero Section */}
            <section className="pt-24 md:pt-32 pb-12 md:pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-wood-brown/10 
                                      text-wood-brown rounded-full text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>تواصل معنا</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight">
                            نحن هنا 
                            <span className="text-wood-brown"> لمساعدتك</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في اختيار الأثاث المثالي لمنزلك
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon
                            const content = (
                                <>
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="w-14 h-14 mb-4 rounded-xl bg-wood-brown/10 
                                                 flex items-center justify-center
                                                 group-hover:bg-wood-brown group-hover:text-white
                                                 transition-all duration-300"
                                    >
                                        <Icon className="w-7 h-7 text-wood-brown group-hover:text-white transition-colors" />
                                    </motion.div>
                                    <h3 className="text-lg font-bold text-charcoal mb-3 group-hover:text-wood-brown transition-colors">
                                        {info.title}
                                    </h3>
                                    <div className="space-y-1.5">
                                        {info.details.map((detail, i) => (
                                            <p key={i} className="text-gray-600 text-sm leading-relaxed">
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                </>
                            )

                            return (
                                <motion.div
                                    key={info.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    {info.href ? (
                                        <a
                                            href={info.href}
                                            className="block group bg-white p-6 rounded-2xl shadow-sm 
                                                     hover:shadow-xl transition-all duration-300
                                                     border border-transparent hover:border-wood-brown/20"
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <div className="group bg-white p-6 rounded-2xl shadow-sm 
                                                      hover:shadow-xl transition-all duration-300
                                                      border border-transparent hover:border-wood-brown/20">
                                            {content}
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                        
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-2">
                                    أرسل لنا رسالة
                                </h2>
                                <p className="text-gray-600">سنرد عليك في أقرب وقت ممكن</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
                                        الاسم الكامل *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                                 focus:ring-2 focus:ring-wood-brown/20 focus:border-wood-brown 
                                                 outline-none transition-all"
                                        placeholder="أدخل اسمك الكامل"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                                            البريد الإلكتروني *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                                     focus:ring-2 focus:ring-wood-brown/20 focus:border-wood-brown 
                                                     outline-none transition-all"
                                            placeholder="example@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
                                            رقم الهاتف *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                                     focus:ring-2 focus:ring-wood-brown/20 focus:border-wood-brown 
                                                     outline-none transition-all"
                                            placeholder="+20 123 456 7890"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-charcoal mb-2">
                                        الموضوع *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                                 focus:ring-2 focus:ring-wood-brown/20 focus:border-wood-brown 
                                                 outline-none transition-all bg-white"
                                    >
                                        <option value="">اختر الموضوع</option>
                                        <option value="inquiry">استفسار عام</option>
                                        <option value="product">استفسار عن منتج</option>
                                        <option value="order">متابعة طلب</option>
                                        <option value="complaint">شكوى</option>
                                        <option value="suggestion">اقتراح</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
                                        الرسالة *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                                 focus:ring-2 focus:ring-wood-brown/20 focus:border-wood-brown 
                                                 outline-none transition-all resize-none"
                                        placeholder="اكتب رسالتك هنا..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-4 bg-wood-brown text-white rounded-xl font-bold 
                                             hover:bg-wood-brown/90 transition-all duration-300 
                                             disabled:opacity-50 disabled:cursor-not-allowed 
                                             flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            جاري الإرسال...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            إرسال الرسالة
                                        </>
                                    )}
                                </button>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-green-50 border-2 border-green-200 rounded-xl 
                                                 text-green-800 flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <span className="font-medium">تم إرسال رسالتك بنجاح! سنتواصل معك قريباً</span>
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>

                        {/* Map/Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                        >
                            <div className="relative h-full min-h-[500px]">
                                {/* Background Image */}
                                <Image
                                    src="/images/geld.png"
                                    alt="TOP HOME"
                                    fill
                                    className="object-cover opacity-20"
                                />
                                
                                {/* Overlay Content */}
                                <div className="absolute inset-0 bg-gradient-to-br from-wood-brown/10 to-charcoal/10 
                                              flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <div className="w-20 h-20 mx-auto mb-6 bg-wood-brown rounded-2xl 
                                                      flex items-center justify-center shadow-xl">
                                            <MapPin className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-charcoal mb-4">موقعنا</h3>
                                        <div className="space-y-2 text-gray-600">
                                            <p className="text-lg font-semibold">القاهرة، مصر</p>
                                            <p className="text-base">شارع التحرير، المعادي</p>
                                        </div>

                                        {/* Features */}
                                        <div className="mt-8 grid grid-cols-2 gap-4">
                                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                                                <Clock className="w-6 h-6 text-wood-brown mx-auto mb-2" />
                                                <p className="text-xs font-semibold text-charcoal">مفتوح يومياً</p>
                                            </div>
                                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                                                <Phone className="w-6 h-6 text-wood-brown mx-auto mb-2" />
                                                <p className="text-xs font-semibold text-charcoal">اتصل الآن</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* WhatsApp CTA */}
            <section className="py-16 md:py-20 bg-wood-brown relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="/images/geld.png"
                        alt="pattern"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-white"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            تحتاج مساعدة فورية؟
                        </h2>
                        <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                            تواصل معنا عبر واتساب للحصول على رد سريع وخدمة احترافية
                        </p>
                        <WhatsAppButton
                            phoneNumber="+201234567890"
                            message="مرحباً، لدي استفسار"
                            size="lg"
                            className="bg-white text-wood-brown hover:bg-white/95 shadow-xl hover:shadow-2xl"
                        />
                        <p className="text-white/70 text-sm mt-4">
                            ✓ رد فوري | ✓ خدمة 24/7 | ✓ استشارة مجانية
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}