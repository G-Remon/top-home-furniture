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
  // Extract path from string or object
  const path = typeof pathOrObj === 'object' && pathOrObj !== null ? pathOrObj.url : pathOrObj;

  // 1. Handle empty or invalid paths
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return fallback;
  }

  // 2. If it's already an absolute URL, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 3. Normalize the path (ensure it starts with /)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // 4. Prepend the Remote Base URL from constants
  const baseUrl = API_BASE_URL.replace(/\/$/, ''); // Remove trailing slash if exists
  return `${baseUrl}${normalizedPath}`;
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
