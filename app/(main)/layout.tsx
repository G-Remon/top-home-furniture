// app/(main)/layout.tsx
import type { ReactNode } from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

export default function MainLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

