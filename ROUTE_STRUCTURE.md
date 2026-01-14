# Route Structure Visualization

## Main Website (with Header & Footer)
```
┌─────────────────────────────────────────────┐
│              HEADER                         │
│  [Logo] [Home] [Products] [About] [Contact]│
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│                                             │
│  Route: /                                   │
│  File: app/(main)/page.tsx                  │
│  Content: Home page with hero, featured    │
│           products, categories, etc.        │
│                                             │
├─────────────────────────────────────────────┤
│  Route: /products                           │
│  File: app/(main)/products/page.tsx         │
│  Content: Product grid with filters        │
│                                             │
├─────────────────────────────────────────────┤
│  Route: /products/[id]                      │
│  File: app/(main)/products/[id]/page.tsx    │
│  Content: Product detail page              │
│                                             │
├─────────────────────────────────────────────┤
│  Route: /about                              │
│  File: app/(main)/about/page.tsx            │
│  Content: Company story, stats, features   │
│                                             │
├─────────────────────────────────────────────┤
│  Route: /contact                            │
│  File: app/(main)/contact/page.tsx          │
│  Content: Contact form and info            │
│                                             │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│              FOOTER                         │
│  [Brand] [Links] [Support] [Contact]       │
└─────────────────────────────────────────────┘
```

## Dashboard (with Sidebar)
```
┌──────────────┬──────────────────────────────┐
│              │                              │
│  SIDEBAR     │  Route: /dashboard           │
│              │  File: app/dashboard/page.tsx│
│ ┌──────────┐ │  Content: Stats & orders     │
│ │Dashboard │ │                              │
│ │Products  │ ├──────────────────────────────┤
│ │Categories│ │  Route: /dashboard/products  │
│ │          │ │  File: app/dashboard/        │
│ │          │ │        products/page.tsx     │
│ │          │ │  Content: Product management │
│ │          │ │                              │
│ │          │ ├──────────────────────────────┤
│ │          │ │  Route: /dashboard/categories│
│ │          │ │  File: app/dashboard/        │
│ │          │ │        categories/page.tsx   │
│ │Logout    │ │  Content: Category management│
│ └──────────┘ │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

## Route Resolution Flow

### Before Fix (BROKEN ❌)
```
app/page.tsx                    → /  ❌
app/(main)/page.tsx             → /  ❌
                                     ↑
                            CONFLICT!
```

### After Fix (WORKING ✅)
```
app/(main)/page.tsx             → /                      ✅
app/(main)/products/page.tsx    → /products              ✅
app/(main)/products/[id]/...    → /products/[id]         ✅
app/(main)/about/page.tsx       → /about                 ✅
app/(main)/contact/page.tsx     → /contact               ✅
app/dashboard/page.tsx          → /dashboard             ✅
app/dashboard/products/...      → /dashboard/products    ✅
app/dashboard/categories/...    → /dashboard/categories  ✅

NO CONFLICTS - ALL UNIQUE PATHS ✅
```

## File System vs URL Mapping

| File Path | URL Path | Layout |
|-----------|----------|--------|
| `app/(main)/page.tsx` | `/` | Header + Footer |
| `app/(main)/products/page.tsx` | `/products` | Header + Footer |
| `app/(main)/products/[id]/page.tsx` | `/products/1` | Header + Footer |
| `app/(main)/about/page.tsx` | `/about` | Header + Footer |
| `app/(main)/contact/page.tsx` | `/contact` | Header + Footer |
| `app/dashboard/page.tsx` | `/dashboard` | Sidebar only |
| `app/dashboard/products/page.tsx` | `/dashboard/products` | Sidebar only |
| `app/dashboard/categories/page.tsx` | `/dashboard/categories` | Sidebar only |

## Layout Inheritance

```
app/layout.tsx (Root Layout)
│
├─── app/(main)/layout.tsx (Main Layout)
│    │   - Adds Header
│    │   - Adds Footer
│    │
│    ├─── app/(main)/page.tsx
│    ├─── app/(main)/products/page.tsx
│    ├─── app/(main)/products/[id]/page.tsx
│    ├─── app/(main)/about/page.tsx
│    └─── app/(main)/contact/page.tsx
│
└─── app/dashboard/layout.tsx (Dashboard Layout)
     │   - Adds Sidebar
     │   - No Header/Footer
     │
     ├─── app/dashboard/page.tsx
     ├─── app/dashboard/products/page.tsx
     └─── app/dashboard/categories/page.tsx
```

## Component Usage Map

### Main Site Pages
```
Header.tsx
  ↓
┌─────────────────────┐
│ Home Page           │ → HeroSection, FeaturedProducts, etc.
│ Products Page       │ → ProductGrid, ProductFilter
│ Product Detail     │ → ProductDetailClient, FloatingWhatsApp
│ About Page         │ → Custom sections
│ Contact Page       │ → Contact form, info cards
└─────────────────────┘
  ↓
Footer.tsx
```

### Dashboard Pages
```
Sidebar (in layout)
  ↓
┌─────────────────────┐
│ Dashboard Home      │ → Stats cards, orders table
│ Products Mgmt       │ → Products table, search
│ Categories Mgmt     │ → Categories grid, modal
└─────────────────────┘
```
