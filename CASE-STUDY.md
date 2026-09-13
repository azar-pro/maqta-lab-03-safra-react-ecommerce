# SAFRA — E-commerce Case Study

## Overview

SAFRA is a fictional contemporary accessories label created as a complete e-commerce portfolio project for MAQTA Studio. The goal was not to imitate a specific fashion retailer, but to build a small brand world that feels credible across campaign imagery, product discovery, product detail, cart and checkout.

The concept is rooted in Fès, Morocco, with an editorial direction built around warm stone, hard light, quiet geometry, black and ivory foundations, and a cobalt accent.

## The challenge

The first versions worked functionally but still felt like a polished template. The main weaknesses were inconsistent photography, uniform product grids, weak hierarchy on interior pages, and mobile commerce flows that prioritized atmosphere over buying clarity.

The project was therefore rebuilt around three priorities:

1. Create a recognizable SAFRA visual language rather than a generic luxury aesthetic.
2. Keep the shopping experience clear and usable while preserving editorial tension.
3. Make every important state — mobile navigation, wishlist, bag, checkout, empty states and errors — feel intentionally designed.

## Art direction

The final visual system uses:

- **Bodoni Moda** for expressive editorial display typography.
- **Manrope** for interface, utility and commerce copy.
- Ivory, black, warm stone and restrained cobalt accents.
- Full-bleed campaign moments mixed with sharp, minimal controls.
- Product photography with warm directional light and tactile surfaces.
- Asymmetric retail grids instead of repetitive card layouts.
- Large-scale typography and controlled negative space.

The strongest rule was restraint: the interface should feel premium because of proportion, rhythm and imagery, not because every element is decorated.

## Experience design

### Home

The homepage behaves like a campaign landing page and a storefront at the same time. It combines a photographic hero, a concise brand point of view, selected products, editorial interludes, category storytelling and a large branded footer.

### Shop

The catalog keeps search, category filters and sorting visible while using an asymmetric grid and an editorial story block to prevent the page from becoming a generic product wall.

### Product detail

The desktop layout uses a split gallery and sticky purchase panel. On mobile, the purchase information is deliberately moved directly after the first image so the user can see the name, price, color and add-to-bag controls before scrolling through the longer object study.

A persistent mobile buy bar keeps the main purchase action accessible without replacing the full product information.

### Bag and checkout

The bag includes quantity editing, removal, delivery-threshold progress and a sticky order summary. Checkout is intentionally marked as a demo: no card details are requested and no personal data is transmitted to a server.

On mobile, the final order button appears after the order summary so the user reviews the total before confirming the demo order.

## Technical implementation

- React 18
- Vite 5
- React Router with `HashRouter` for static GitHub Pages compatibility
- Context-based store state
- `localStorage` cart and wishlist persistence
- Dynamic product routes
- Search, category filtering and sorting
- Client-side form validation
- Responsive mobile navigation
- Error boundary and 404 state
- Route-specific page titles and descriptions
- Open Graph, Twitter Card, manifest, robots and sitemap metadata
- Reduced-motion support
- Keyboard skip link and accessible form labels

## Visual QA process

The project includes a GitHub Actions visual-review workflow using Playwright. Every relevant push builds the app, launches a review server and captures a fixed set of desktop and mobile screenshots for:

- Home
- Shop
- Product detail
- Jewelry product detail
- About
- Wishlist
- Bag
- Checkout
- Mobile navigation

This made it possible to review spacing, crop, hierarchy and responsive behavior from rendered pages instead of relying only on source-code inspection.

## Key refinements made during QA

- Rebuilt the mobile menu as a complete full-screen experience.
- Moved mobile PDP purchase information immediately after the first product image.
- Corrected oversized empty gallery space on desktop product pages.
- Rebalanced Shop grid rhythm.
- Increased functional microtype where it became too small to read comfortably.
- Improved contrast in service and utility sections.
- Replaced mixed stock/vector catalog imagery with a unified SAFRA photography direction.
- Updated bag and checkout summaries to use the same product photography as the storefront.
- Added intrinsic image dimensions and loading priorities to reduce layout shift and improve perceived loading.

## Constraints

SAFRA is a portfolio concept, not a production commerce platform. It intentionally does **not** include:

- a payment gateway
- a database
- customer accounts
- a real order API
- inventory synchronization
- server-side checkout

A production version would connect the interface to a secure backend, payment provider, product CMS and image CDN.

## Outcome

The final result is a compact editorial storefront that demonstrates both brand design and front-end commerce thinking. The project is intended to show how MAQTA Studio can move beyond a homepage mockup and design a coherent retail system across campaign, catalog, product, cart and checkout experiences.

Created by **MAQTA Studio** — https://maqtastudio.com
