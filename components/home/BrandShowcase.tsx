// components/home/BrandShowcase.tsx
'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const brands = [
    'تصميمات عالمية', 'جودة مصرية', 'أخشاب طبيعية', 'ضمان حقيقي', 'توصيل منزلي', 'تركيب محترف', 'أفضل سعر'
];

export default function BrandShowcase() {
    return (
        <div className="py-10 bg-gray-50 border-y border-gray-100 overflow-hidden">
            <Swiper
                modules={[Autoplay, FreeMode]}
                slidesPerView={2}
                spaceBetween={50}
                loop={true}
                freeMode={true}
                speed={5000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                }}
                className="brand-swiper"
            >
                {brands.concat(brands).map((brand, i) => (
                    <SwiperSlide key={i} className="flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-black text-gray-300 hover:text-[#D4AF37] transition-colors cursor-default whitespace-nowrap">
                            {brand}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
        .brand-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
        </div>
    );
}
