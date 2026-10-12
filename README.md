# NovaShop — Full-Stack E-Commerce Web Application

A complete, production-grade, full-stack **E-commerce Store** built with the **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Radix UI**, **next-themes**, **Zustand**, **React Hook Form**, and **Zod**.

---

## Table of Contents
1. [Core Features & Architecture](#core-features--architecture)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started (Installation & Run)](#getting-started-installation--run)
5. [Publishing to GitHub Instructions](#publishing-to-github-instructions)
6. [Capturing Genuine Lighthouse Audit Results](#capturing-genuine-lighthouse-audit-results)
7. [Technical Documentation](#technical-documentation)

---

## Core Features & Architecture

### 1. Accessible UI & Hydration
- **Server Component First**: Static content, marketing banners, and product catalogs are rendered as React Server Components (RSC) with zero client bundle overhead.
- **SSG Static Pre-rendering**: Product detail routes (`/products/[id]`) are pre-generated at build time via `generateStaticParams()` for all 20 catalog products.
- **Dark / Light / System Theme Switching**: Seamless theme toggle powered by `next-themes` and class-based CSS tokens. Hydration mismatches are eliminated using `suppressHydrationWarning` on `<html>` and client-side mount guards.
- **Accessible Primitives**: Built on Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-toast`, `@radix-ui/react-label`, etc.) with full keyboard navigation, screen reader ARIA landmarks, and focus management.

### 2. Zustand State Management
- **Persistent Shopping Cart**: In-memory shopping cart backed by browser `localStorage` using Zustand's `persist` middleware.
- **Hydration Safety**: Uses `skipHydration: true` and controlled `useCartStore.persist.rehydrate()` on client mount to eliminate SSR/CSR state conflicts.
- **Atomic Selectors**: State subscriptions are isolated via memoized selectors (`useCartItems`, `useCartTotalItems`, `useCartTotalPrice`) preventing unnecessary re-renders when other slices change.
- **Interactive Actions**: Supports adding items, incrementing/decrementing quantities bounded by stock inventory, removing line items, clearing the cart, and live cart badge counting.

### 3. Type-Safe Form Mutations
- **Shared Zod Validation**: Single source of truth (`lib/schemas/checkout.ts`) shared identically between client-side React Hook Form and server-side Server Action.
- **React Hook Form**: Client-side instantaneous feedback on field blur (`mode: "onBlur"`) with accessible error messages and ARIA attributes.
- **Next.js Server Actions**: Form submissions trigger a dedicated server mutation (`lib/actions/checkout.ts`) using React 19's `useActionState`. The server independently re-validates and sanitizes all inputs (stripping HTML injection vectors).
- **Suspense & Loading States**: Checkout forms and order summaries are isolated within React `Suspense` boundaries with animated loading skeletons.
- **Order Confirmation**: Idempotent order ID generation (e.g., `ORD-MV5I18FB-2SJZ`) with automatic cart clearance and redirection to the order confirmation page.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 (Strict Mode) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Component Primitives** | Radix UI (`dialog`, `toast`, `label`, `slot`) |
| **Theme** | `next-themes` |
| **State Management** | Zustand 5 (`persist` middleware) |
| **Forms & Validation** | React Hook Form 7 + Zod 3 (`@hookform/resolvers`) |
| **Icons** | Lucide React |

---

## Project Structure

```
c:\ASSIGNMENT1\
├── app/
│   ├── layout.tsx               # Root layout: ThemeProvider, Inter font, metadata, Navbar, Footer
│   ├── page.tsx                 # Home page (Server Component) with Hero & CategoryFilter
│   ├── globals.css              # Tailwind CSS v4 theme, animations, dark mode tokens
│   ├── not-found.tsx            # Custom accessible 404 page
│   ├── cart/
│   │   └── page.tsx             # Dedicated cart page with item table and subtotal
│   ├── checkout/
│   │   ├── page.tsx             # Checkout page wrapped in Suspense boundaries
│   │   └── success/
│   │       └── page.tsx         # Dynamic order confirmation view (reads orderId)
│   └── products/
│       ├── page.tsx             # All products listing view
│       └── [id]/
│           └── page.tsx         # Product detail SSG route with generateStaticParams
├── components/
│   ├── ui/                      # Accessible UI components (button, card, badge, input, dialog, toast)
│   ├── layout/
│   │   ├── navbar.tsx           # Responsive navigation bar with mobile drawer
│   │   └── footer.tsx           # Site footer with category links
│   ├── products/
│   │   ├── product-card.tsx     # Card with image, star rating, badges, add-to-cart action
│   │   ├── product-grid.tsx     # Responsive grid container
│   │   ├── product-detail.tsx   # Detailed product view with quantity stepper
│   │   └── category-filter.tsx  # Client-side tabbed category filtering
│   ├── cart/
│   │   ├── cart-sheet.tsx       # Radix slide-out cart drawer
│   │   ├── cart-item.tsx        # Item row with quantity controls
│   │   └── cart-badge.tsx       # Animated badge showing current item count
│   ├── checkout/
│   │   ├── checkout-form.tsx    # React Hook Form + Zod + useActionState Server Action
│   │   └── order-summary.tsx    # Live calculated order summary breakdown
│   └── theme/
│       ├── theme-provider.tsx   # Client wrapper for next-themes
│       └── theme-toggle.tsx     # Light/Dark/System toggle with mount guard
├── docs/
│   └── technical-report.md      # Detailed 2-3 page technical architecture report
├── hooks/
│   └── use-toast.ts             # Toast dispatching hook
├── lib/
│   ├── actions/
│   │   └── checkout.ts          # Server Action: server-side sanitization, Zod validation, order ID
│   ├── schemas/
│   │   └── checkout.ts          # Shared Zod validation schema
│   ├── store/
│   │   └── cart.ts              # Zustand store with localStorage persist and skipHydration
│   ├── products.ts              # 20 curated sample products with high-resolution Unsplash photos
│   └── utils.ts                 # Formatting utilities and class merger (cn)
├── types/
│   └── index.ts                 # Shared TypeScript interfaces (Product, CartItem, OrderResult)
├── next.config.ts               # Turbopack rules & remote image pattern configuration
├── package.json                 # Project dependencies & scripts
└── tsconfig.json                # TypeScript compiler configuration
```

---

## Getting Started (Installation & Run)

### Prerequisites
- Node.js v20+ or v24+
- npm v10+

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Build & Run for Production (Recommended for Benchmarks)
```bash
# 1. Compile production build (verifies TypeScript & SSG page generation)
npm run build

# 2. Start the optimized production server
npm run start
```
The production server will listen on `http://localhost:3000`.

---

## Publishing to GitHub Instructions

Follow these exact steps to publish this repository to your GitHub account:

### Step 1: Initialize Git and Stage Files
```bash
# In c:\ASSIGNMENT1\
git init
git add .
git commit -m "feat: complete full-stack e-commerce store with Next.js, Zustand, and Server Actions"
```

### Step 2: Create a New Repository on GitHub
1. Navigate to [github.com/new](https://github.com/new).
2. Set **Repository name** (e.g., `ecommerce-store` or `nextjs-ecommerce`).
3. Set visibility to **Public** or **Private**.
4. Leave "Add a README file", ".gitignore", and license **unchecked** (we already have them).
5. Click **Create repository**.

### Step 3: Link Remote and Push
```bash
# Rename branch to main
git branch -M main

# Add your GitHub remote URL (replace <YOUR_USERNAME> and <REPO_NAME>)
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git

# Push code to GitHub
git push -u origin main
```

---

## Capturing Genuine Lighthouse Audit Results

To ensure accurate, un-throttled Core Web Vitals (LCP, CLS, INP) without development server noise or browser extension interference:

### Step 1: Run in Production Mode
Always run Lighthouse against the production build:
```bash
npm run build
npm run start
```
*Note: Do not run Lighthouse in `npm run dev` mode because dev bundles include React development warnings, hot module replacement scripts, and un-minified code.*

### Step 2: Open an Incognito Window
1. Open Google Chrome.
2. Press `Ctrl + Shift + N` (Windows) to open a fresh **Incognito Window** (disables third-party extensions and cached cookies).
3. Navigate to `http://localhost:3000`.

### Step 3: Run Lighthouse via Chrome DevTools
1. Press `F12` or `Ctrl + Shift + I` to open Chrome DevTools.
2. Click on the **Lighthouse** tab in the top bar.
3. Configure settings:
   - **Mode:** Navigation (Default)
   - **Device:** Select **Mobile** first (Google's ranking benchmark), then repeat for **Desktop**.
   - **Categories:** Check *Performance*, *Accessibility*, *Best Practices*, and *SEO*.
4. Click **Analyze page load**.
5. When complete, click the top-right menu (three dots) inside the report and select:
   - **Save as HTML** or **Print / Save as PDF** to archive the genuine audit report.

---

## Technical Documentation

For an in-depth analysis of:
- React Server Components (RSC) vs. Client Components boundary decisions
- Hydration mismatch mitigations with Zustand and `next-themes`
- Server State vs. Zustand caching trade-offs
- Core Web Vitals (LCP, CLS, INP) optimization techniques

Please consult the full technical document at:
👉 **[`docs/technical-report.md`](docs/technical-report.md)**
