import 'server-only'
import axios, { AxiosInstance } from 'axios'
import { getSessionToken } from '@/lib/session'
import { API_BASE_URL } from '@/lib/constants'

// Ensure we have a valid baseURL
const baseURL = typeof window === 'undefined'
    ? 'http://tophomedev.runasp.net/api/' // Direct server-to-server URL (fastest) 
    : (API_BASE_URL || '/api/')

export const serverApi: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
})

serverApi.interceptors.request.use(async (config) => {
    const token = await getSessionToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Simplified error handling for server
serverApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(`SERVER API ERROR: [${error.config?.method?.toUpperCase()} ${error.config?.url}]`, error.message)
        return Promise.reject(error)
    }
)
