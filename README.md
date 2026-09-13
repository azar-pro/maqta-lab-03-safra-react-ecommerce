# MAQTA Lab 03 — SAFRA React E-commerce

![SAFRA campaign](public/assets/safra/campaign-hero-v2.webp)

**SAFRA** is a fictional contemporary accessories label from Fès, Morocco, designed and developed as a complete fashion e-commerce portfolio project for **MAQTA Studio**.

The project explores how editorial art direction and practical commerce UX can coexist across campaign, catalog, product detail, wishlist, bag and checkout experiences.

## Project status

- ✅ Responsive React storefront
- ✅ Original SAFRA campaign and product photography direction
- ✅ Desktop + mobile visual QA
- ✅ Automated production build check
- ✅ Production dependency audit
- ✅ Automated WCAG accessibility audit
- ✅ SEO/social metadata, manifest, robots and sitemap
- ⏳ GitHub Pages deployment workflow prepared — repository Pages must be enabled once in GitHub settings

## Design direction

The final system combines:

- Bodoni Moda display typography
- Manrope interface typography
- Ivory and black foundations
- Cobalt accent color
- Warm stone and directional-light photography
- Asymmetric editorial product grids
- Sharp, minimal commerce controls
- Large-scale type and deliberate negative space

The goal is a recognizable SAFRA identity rather than a generic “luxury template” aesthetic.

## Stack

- React 18
- Vite 5
- React Router 6 / HashRouter
- Context API
- CSS
- localStorage for cart and wishlist state
- GitHub Actions
- Playwright visual regression review
- axe-core accessibility review

## Commerce experience

- Campaign-led responsive Home page
- Product catalog with search, category filters and sorting
- Dynamic product detail routes
- Color preview selection
- Quantity controls
- Quick Add and full Add to Bag flows
- Persistent cart
- Persistent wishlist
- Shipping-threshold progress
- Editorial empty states and custom 404
- Full-screen mobile navigation
- Mobile sticky product buy bar
- Demo checkout with accessible client-side validation
- Responsive order summary

## Product imagery

The current catalog uses local WebP product photography with SVG artwork retained only as a fallback. Alternate colors are simulated visual previews in this portfolio version; a production store would use dedicated photography for every sellable color variant.

## Quality assurance

The repository contains two primary automated QA workflows:

**Build check** installs dependencies, audits production dependencies, creates the Vite production bundle and uploads the build artifact.

**Visual review** builds the project, launches Chromium with Playwright, captures the key desktop/mobile routes and runs an automated WCAG A/AA accessibility audit with axe-core.

See [TESTING.md](TESTING.md) for the complete test matrix and [CASE-STUDY.md](CASE-STUDY.md) for the design and development case study.

## Run locally

Requirements: a current Node.js installation.

```bash
npm install
npm run dev
```

Vite will print the local development address, normally `http://localhost:5173`.

To verify the production bundle:

```bash
npm run build
npm run preview
```

## Architecture notes

SAFRA uses `HashRouter` so the static portfolio build works reliably on GitHub Pages without server-side route rewrites. As a result, the root document is the primary indexable URL; a production commerce implementation would normally use framework/server rendering or route-aware static generation for richer per-product SEO.

## Demo limitations

This is a fictional portfolio storefront, not a live retailer. It intentionally does not connect to:

- a real payment gateway
- an order API
- a customer database
- authentication
- inventory synchronization
- server-side checkout

No real payment is collected by the demo checkout.

## Portfolio credit

Created by **MAQTA Studio** — https://maqtastudio.com
