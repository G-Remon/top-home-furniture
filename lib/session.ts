import 'server-only'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

const SESSION_COOKIE_NAME = 'session_token'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function createSession(token: string) {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getSessionToken() {
    try {
        const cookieStore = await cookies()
        return cookieStore.get(SESSION_COOKIE_NAME)?.value
    } catch (error) {
        // Return undefined during static generation or if cookies() is unavailable
        return undefined
    }
}

export async function getSession() {
    const token = await getSessionToken()
    if (!token) return null

    try {
        const decoded = jwtDecode(token) as any // eslint-disable-line @typescript-eslint/no-explicit-any
        // Basic expiration check (should also be verified by signature on backend)
        if (decoded.exp * 1000 < Date.now()) {
            await deleteSession()
            return null
        }

        return {
            user: {
                userId: decoded.sub || decoded.userId || decoded.id,
                userName: decoded.name || decoded.unique_name || decoded.email,
                email: decoded.email,
                role: decoded.role || 'user',
            },
            isAuthenticated: true,
            token
        }
    } catch (error) {
        return null
    }
}
