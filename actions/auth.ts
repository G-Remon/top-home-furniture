'use server'

import { serverApi } from '@/lib/server-api'
import { createSession, deleteSession } from '@/lib/session'
import { LoginFormData, RegisterFormData } from '@/schemas/auth.schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Robust token extractor (copied from original service)
const normalizeAuthResponse = (data: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    let token = data.token || data.Token || data.accessToken || data.AccessToken || data.jwt || data.Jwt

    // Check nested
    if (!token && data.result) token = data.result.token || data.result.Token || data.result.accessToken
    if (!token && data.data) token = data.data.token || data.data.Token || data.data.accessToken

    // Check string
    if (!token && typeof data === 'string' && data.length > 20) token = data

    if (!token) throw new Error('Authentication failed: Server response did not contain a valid token.')

    // We only really need the token for the session; we decode everything else from it
    return { token }
}

export async function loginAction(prevState: unknown, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' }
    }

    try {
        const response = await serverApi.post('Account/Login', { email, password })
        const { token } = normalizeAuthResponse(response.data)

        await createSession(token)
    } catch (error: unknown) {
        const err = error as any;
        const msg = err.response?.data?.message || err.message || 'فشل تسجيل الدخول'
        return { error: msg }
    }

    revalidatePath('/')
    redirect('/')
}

export async function registerAction(prevState: unknown, formData: RegisterFormData) {
    // Client side validation should be primary, but we pass data here
    try {
        // Note: serverApi automatically sets content-type json
        const response = await serverApi.post('Account/Register', formData)
        const { token } = normalizeAuthResponse(response.data)

        await createSession(token)
    } catch (error: unknown) {
        const err = error as any;
        const msg = err.response?.data?.message || err.message || 'فشل إنشاء الحساب'
        return { error: msg }
    }

    revalidatePath('/')
    redirect('/')
}

export async function logoutAction() {
    await deleteSession()
    revalidatePath('/')
    redirect('/login')
}
