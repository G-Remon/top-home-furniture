// lib/constants.ts
import { Product, Category } from '@/types/product'

export const PHONE_NUMBER = '+201234567890'

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
    shortDescription: 'كنبة مصممة بأناقة مع لمسات عصرية',
    fullDescription: 'كنبة فاخرة مصنوعة من أفضل أنواع الجلد الطبيعي، مصممة لتوفير أقصى درجات الراحة مع الحفاظ على الأناقة. تأتي بضمان 3 سنوات.',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    category: 'living-room',
    material: 'جلد طبيعي - خشب زان',
    dimensions: '220 × 95 × 85 سم',
    weight: '85 كجم',
    deliveryTime: '5-7 أيام عمل',
    isNew: true,
    isFeatured: true,
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
    reviews: 42,
    stock: 12,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'سرير فخم من الخشب الطبيعي',
    shortDescription: 'سرير مصمم للراحة مع لمسات عصرية',
    fullDescription: 'سرير فاخر مصنوع من خشب طبيعي عالي الجودة، مصمم لتوفير نوم مريح وثبات عالي مع تصميم أنيق يناسب غرف النوم الحديثة. يأتي بضمان 3 سنوات.',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    category: 'bedroom',
    material: 'خشب طبيعي - قماش مبطن',
    dimensions: '200 × 160 × 110 سم',
    weight: '90 كجم',
    deliveryTime: '5-7 أيام عمل',
    isNew: true,
    isFeatured: true,
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
    reviews: 42,
    stock: 12,
    createdAt: '2024-01-15',
  }

  // ... المزيد من المنتجات
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

export const navigation = [
  { name: 'الرئيسية', href: '/' },
  { name: 'المنتجات', href: '/products' },
  { name: 'الفئات', href: '/products#categories' },
  { name: 'عن توب هوم', href: '/about' },
  { name: 'اتصل بنا', href: '/contact' },
]