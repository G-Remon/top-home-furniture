// app/(main)/layout.tsx
import type { ReactNode } from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function MainLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <ProtectedRoute>
            <Header />
            {children}
            <Footer />
        </ProtectedRoute>
    )
}

