'use client'

import Link from 'next/link'
import { ChevronLeft, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
    className?: string
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("flex overflow-x-auto no-scrollbar py-2", className)}
        >
            <ol className="flex items-center space-x-2 space-x-reverse text-sm font-medium text-gray-500 whitespace-nowrap">
                <li className="flex items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-1 hover:text-wood-brown transition-colors"
                        title="الرئيسية"
                    >
                        <Home size={16} />
                        <span className="sr-only">الرئيسية</span>
                    </Link>
                </li>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={index} className="flex items-center gap-2">
                            <ChevronLeft size={14} className="text-gray-400 shrink-0" />
                            {isLast || !item.href ? (
                                <span className="text-wood-brown font-bold truncate max-w-[150px] sm:max-w-[300px]" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-wood-brown transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
