# Next.js Performance Optimization Plan

## Information Gathered
- Most components (Header, Footer, ProductDetail, WishlistProvider, ProductGrid, ProductCard, FeaturedProducts, CategoriesSection) are client components due to interactivity (useState, useEffect, motion, swiper)
- Heavy libraries like Swiper and Framer Motion are imported directly, increasing bundle size
- No Turbopack enabled in next.config.mjs
- Auth and wishlist are client-side with repeated fetches
- No dynamic imports for heavy components
- CSS is loaded normally without lazy loading

## Plan
### 1. Dynamic Imports for Heavy Libraries
- Convert Swiper imports to dynamic imports with { ssr: false }
- Convert Framer Motion components to dynamic where possible
- Apply to: ProductDetailClient, FeaturedProducts, CategoriesSection, ProductCard

### 2. Enable Turbopack for Faster Builds
- Add turbopack configuration to next.config.mjs
- Set turbopack.root to project directory

### 3. Server Actions for Auth and Wishlist
- Convert wishlist operations to Server Actions
- Use HTTP-only cookies for auth state
- Update WishlistContext to use server actions

### 4. Lazy Load CSS and Tailwind Optimizations
- Implement lazy loading for heavy CSS files
- Ensure Tailwind JIT is enabled and unused classes are purged
- Optimize Tailwind config for better performance

### 5. Dev Server Optimizations
- Add Node.js memory optimization flags
- Configure dev server for better performance
- Ignore heavy dev tasks like analytics and SSR previews

### 6. Reduce Hot Reload Overhead
- Configure .eslintignore and .gitignore for dev files
- Reduce useEffect fetches that trigger on every mount
- Optimize component re-renders

## Dependent Files to Edit
- components/products/ProductDetailClient.tsx
- components/home/FeaturedProducts.tsx
- components/home/CategoriesSection.tsx
- components/products/ProductCard.tsx
- components/home/products/ProductCard.tsx
- context/WishlistContext.tsx
- next.config.mjs
- tailwind.config.ts
- package.json (for scripts)

## Followup Steps
- Test build performance improvements
- Monitor dev server CPU/memory usage
- Verify functionality after optimizations
- Run performance benchmarks
