import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#faf9f6',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'TOP HOME - أثاث فاخر لبيت الأحلام',
    template: '%s | TOP HOME',
  },
  description: 'توب هوم - علامة رائدة في صناعة الأثاث الفاخر، نقدم تصميمات أنيقة وعصرية تجمع بين الجمال والراحة.',
  keywords: ['أثاث', 'فاخر', 'توب هوم', 'ديكور', 'أثاث منزلي', 'أثاث مودرن'],
  authors: [{ name: 'TOP HOME' }],
  creator: 'TOP HOME',
  metadataBase: new URL('https://tophome.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: 'https://tophome.com',
    title: 'TOP HOME',
    description: 'أثاث فاخر لبيت الأحلام',
    siteName: 'TOP HOME',
    images: [
      {
        url: '/Gemini_Generated_Image_3grbla3grbla3grb.jpg',
        width: 1200,
        height: 630,
        alt: 'TOP HOME - أثاث فاخر',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOP HOME',
    description: 'أثاث فاخر لبيت الأحلام',
    images: ['/Gemini_Generated_Image_3grbla3grbla3grb.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cn(inter.variable, "antialiased scroll-smooth")} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans relative">
        {/* خلفية تدرجية مع تأثير خفي */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
          <div className="absolute top-0 left-0 right-0 h-96 opacity-20">
            <Image
              src="/Gemini_Generated_Image_3grbla3grbla3grb.jpg"
              alt="خلفية TOP HOME للأثاث الفاخر"
              fill
              className="object-cover"
              priority
              quality={80}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10 rotate-180">
            <Image
              src="/Gemini_Generated_Image_3grbla3grbla3grb.jpg"
              alt=""
              fill
              className="object-cover"
              quality={60}
              sizes="100vw"
            />
          </div>
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>

        {/* شعار عائم في الزاوية */}
        <div className="fixed bottom-4 left-4 z-50 hidden md:block">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
            <Image
              src="/Gemini_Generated_Image_3grbla3grbla3grb.jpg"
              alt="شعار TOP HOME"
              fill
              className="object-cover rounded-full"
              quality={90}
              sizes="80px"
            />
          </div>
        </div>
      </body>
    </html>
  )
}