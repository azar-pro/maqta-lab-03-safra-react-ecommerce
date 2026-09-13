# SAFRA — Testing & QA

This project is tested as a static React storefront portfolio demo. The goal is to protect the browsing, cart, wishlist and checkout interactions while also reviewing the rendered visual system on desktop and mobile.

## Automated checks

Two GitHub Actions workflows are used during development:

### Build check

Runs a fresh install and production Vite build. A successful run confirms that the current source compiles into the `dist` bundle without React/Vite build errors.

### Visual review

Builds the app, starts a review server, uses Playwright Chromium, and captures desktop and mobile screenshots of the most important routes and states.

The review set includes:

- Home — desktop and mobile
- Shop — desktop and mobile
- Product detail — desktop and mobile
- Jewelry product detail
- About
- Wishlist with saved items
- Bag with multiple seeded items
- Checkout with multiple seeded items
- Open mobile navigation

The screenshots are uploaded as a temporary GitHub Actions artifact for visual QA.

## Manual functional checklist

### Navigation

- Header navigation opens the correct routes.
- Mobile menu opens, closes and responds to Escape.
- Logo returns to Home.
- Footer navigation reaches Shop, Wishlist, About and Bag.
- Unknown routes show the styled 404 state.

### Shop

- Category tabs filter the catalog.
- URL category query updates correctly.
- Search matches product name, category and material.
- Sort works by featured, ascending price, descending price and name.
- Reset returns the shop to the full collection.
- Product cards open the correct product route.

### Product detail

- Correct product data is shown for each route.
- Color controls update the visual preview state.
- Quantity cannot go below 1 or above 10.
- Add to Bag stores the selected color and quantity.
- Wishlist toggle persists.
- Related products exclude the current item.
- Mobile buy bar reflects current product, color and quantity.

### Wishlist

- Save/remove state persists in local storage.
- Saved product count updates in the header.
- Empty state appears when no products are saved.

### Bag

- Product, selected color and quantity are correct.
- Quantity controls update totals.
- Quantity zero removes the line item.
- Remove action deletes the line item.
- Shipping threshold logic updates correctly.
- Empty state appears when the bag is cleared.

### Checkout

- Empty bag cannot proceed to the checkout form.
- Required fields validate client-side.
- Invalid fields receive accessible error messages.
- Focus moves to the first invalid field after submit.
- Order summary matches the current bag.
- Mobile final action appears after the order summary.
- Successful demo submit clears the local cart.
- No payment card data is requested.
- No checkout data is sent to a backend.

## Responsive review targets

The automated visual review currently uses:

- Desktop: `1440 × 1000`
- Mobile: `390 × 844`

Additional manual review is recommended around:

- 1280px desktop
- 1024px tablet landscape
- 768px tablet portrait
- 430px large phone
- 360px small phone

## Accessibility checks

Implemented accessibility details include:

- semantic buttons and links
- labelled navigation
- skip-to-content link
- visible keyboard focus handling
- form labels and `aria-invalid`
- form error associations with `aria-describedby`
- `aria-live` feedback for relevant cart/product states
- reduced-motion support
- accessible labels for color, quantity, wishlist and bag controls
- decorative campaign imagery hidden from assistive technology where appropriate

Manual keyboard testing should cover the complete path:

`Header → Shop → Product → Add to Bag → Bag → Checkout`.

## Performance notes

The production build uses:

- WebP campaign and product images
- lazy loading for non-priority catalog imagery
- eager/high-priority loading for key above-the-fold imagery
- intrinsic image dimensions to reduce layout shift
- a preloaded campaign hero
- a compact React/Vite bundle

The external Google Fonts request remains a deliberate art-direction dependency. A production commerce version could self-host licensed font files and serve responsive image variants through a CDN.

## Browser scope

Primary QA target:

- current Chromium-based desktop browsers
- modern mobile Chromium/WebKit browsers

Because this is a portfolio concept, legacy browser support is not a project requirement.

## Final release rule

A release candidate is considered acceptable only when:

1. the production build succeeds,
2. the visual-review workflow succeeds,
3. desktop and mobile screenshots show no obvious crop/layout regression,
4. Shop, Product, Bag and Checkout core flows work manually,
5. the demo limitations remain clearly disclosed.
