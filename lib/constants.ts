// lib/constants.ts
import { Product, Category } from '@/types/product'

export const PHONE_NUMBER = '+201234567890'
export const API_BASE_URL = 'http://tophomedev.runasp.net'

export const categories: Category[] = [
  {
    id: 'living-room',
    name: 'غرف المعيشة',
    count: 24,
    description: 'كنبات وطاولات وديكورات غرف المعيشة',
    image: '/images/living.png',
  },
  {
    id: 'bedroom',
    name: 'غرف النوم',
    count: 18,
    description: 'أسرّة وخزائن وطاولات جانبية',
    image: '/images/Sleeping.png',
  },
  {
    id: 'dining',
    name: 'طاولات الطعام',
    count: 12,
    description: 'طاولات وكراسي غرف الطعام',
    image: '/images/eat.png',
  },
  {
    id: 'office',
    name: 'أثاث المكاتب',
    count: 8,
    description: 'مكاتب وكراسي ووحدات تخزين',
    image: '/images/mkatb.png',
  },
  {
    id: 'outdoor',
    name: 'أثاث خارجي',
    count: 6,
    description: 'أثاث الحدائق والشرفات',
    image: '/images/kharegya.png',
  },
  {
    id: 'accessories',
    name: 'اكسسوارات',
    count: 15,
    description: 'إكسسوارات وديكورات منزلية',
    image: '/images/aksesorat.png',
  },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'كنبة فاخرة من الجلد الطبيعي',
    description: 'كنبة فاخرة مصنوعة من أفضل أنواع الجلد الطبيعي، مصممة لتوفير أقصى درجات الراحة مع الحفاظ على الأناقة. تأتي بضمان 3 سنوات.',
    category: 'living-room',
    material: 'جلد طبيعي - خشب زان',
    weight: 85,
    weightUnit: 'كجم',
    width: 220,
    depth: 95,
    height: 85,
    dimensionUnit: 'سم',
    deliveryDays: 7,
    deliveryUnit: 'أيام عمل',
    originalPrice: 29999,
    currentPrice: 24999,
    discountAmount: 5000,
    discountPercentage: 17,
    currency: 'ج.م',
    stockQuantity: 12,
    inStock: true,
    color: 'أسود',
    images: [
      '/images/geld.png',
      '/images/living.png',
    ],
    features: [
      'تصميم مريح يدعم الظهر',
      'مواد عالية الجودة',
      'سهلة التنظيف والصيانة',
      'ضمان 3 سنوات',
    ],
    rating: 4.8,
  },
  {
    id: '2',
    name: 'سرير فخم من الخشب الطبيعي',
    description: 'سرير فاخر مصنوع من خشب طبيعي عالي الجودة، مصممة لتوفير نوم مريح وثبات عالي مع تصميم أنيق يناسب غرف النوم الحديثة.',
    category: 'bedroom',
    material: 'خشب طبيعي - قماش مبطن',
    weight: 90,
    weightUnit: 'كجم',
    width: 200,
    depth: 160,
    height: 110,
    dimensionUnit: 'سم',
    deliveryDays: 7,
    deliveryUnit: 'أيام عمل',
    originalPrice: 29999,
    currentPrice: 24999,
    discountAmount: 5000,
    discountPercentage: 17,
    currency: 'ج.م',
    stockQuantity: 12,
    inStock: true,
    color: 'بني',
    images: [
      '/images/Sleeping.png',
      '/images/Sleeping.png',
    ],
    features: [
      'تصميم مريح يدعم الظهر',
      'هيكل قوي وثابت',
      'تشطيب عالي الجودة',
      'ضمان 3 سنوات',
    ],
    rating: 4.8,
  }
]

export const trustPoints = [
  {
    title: 'جودة لا تُضاهى',
    description: 'نستخدم أفضل المواد الخام في تصنيع أثاثنا',
    icon: 'Quality',
  },
  {
    title: 'تصميمات حصرية',
    description: 'كل قطعة مصممة بعناية لتلبي ذوقك الرفيع',
    icon: 'Design',
  },
  {
    title: 'توصيل سريع',
    description: 'نضمن وصول منتجاتك في الوقت المحدد',
    icon: 'Delivery',
  },
  {
    title: 'ضمان 5 سنوات',
    description: 'ثقة في منتجاتنا مع ضمان ممتد',
    icon: 'Warranty',
  },
]

export const navigationLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'المنتجات', href: '/products' },
  { name: 'من نحن', href: '/about' },
  { name: 'تواصل معنا', href: '/contact' },
]