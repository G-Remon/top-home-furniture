import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProviders } from '@/components/providers/AppProviders'
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
        url: '/images/main-hero.png',
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
    images: ['/images/main-hero.png'],
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
      <body className="min-h-screen bg-background font-sans relative" suppressHydrationWarning>
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  )
}