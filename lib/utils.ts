// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { API_BASE_URL } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolves a product image URL by prepending the API base URL if the path is relative.
 * 
 * @param pathOrObj - The image path (string) or ProductImage object
 * @param fallback - The fallback image to return if the path is invalid
 * @returns The full resolved URL string
 */
export function getFullImageUrl(pathOrObj: string | any | null | undefined, fallback: string = '/images/geld.png'): string {
  const resolve = (p: string): string => {
    // If it's already an absolute URL, return it as is
    if (p.startsWith('http://') || p.startsWith('https://')) {
      return p
    }

    // Normalize the path (ensure it starts with /)
    const normalizedPath = p.startsWith('/') ? p : `/${p}`

    // Prepend the Remote Base URL from constants
    const baseUrl = API_BASE_URL.replace(/\/$/, '')
    return `${baseUrl}${normalizedPath}`
  }

  // Extract path from string or object
  const path = typeof pathOrObj === 'object' && pathOrObj !== null ? pathOrObj.url : pathOrObj;

  // 1. Handle empty or invalid paths
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return resolve(fallback);
  }

  return resolve(path);
}

/**
 * Formats a number as a currency string in Arabic (Egypt) locale.
 * @param price - The price to format
 * @returns Formatted currency string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0
  }).format(price);
}
