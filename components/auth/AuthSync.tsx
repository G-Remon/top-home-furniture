'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { getSessionAction } from '@/actions/session'

export default function AuthSync() {
    const { setAuth, logout } = useAuthStore()

    useEffect(() => {
        const syncSession = async () => {
            try {
                const session = await getSessionAction()
                if (session && session.isAuthenticated) {
                    setAuth({
                        token: session.token, // This is just for memory reference if needed
                        userName: session.user.userName,
                        email: session.user.email,
                        userId: session.user.userId,
                        role: session.user.role
                    })
                } else {
                    // If server says no session, clear client state
                    logout()
                }
            } catch (error) {
                logout()
            }
        }

        syncSession()
    }, [setAuth, logout])

    return null
}
