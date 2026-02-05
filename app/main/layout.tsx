// app/main/layout.tsx
import type { ReactNode } from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { AppProviders } from '@/components/providers/AppProviders'
import { Toaster } from '@/components/ui/toaster'
import { getWishlistAction } from '@/actions/wishlist'

export default async function MainLayout({
    children,
}: {
    children: ReactNode
}) {
    const wishlist = await getWishlistAction();

    return (
        <AppProviders initialWishlist={wishlist}>
            <Header />
            {children}
            <Footer />
            <Toaster />
        </AppProviders>
    )
}
