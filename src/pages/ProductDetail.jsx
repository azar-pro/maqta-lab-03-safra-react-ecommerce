import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, variantPresets } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(item => item.id === id);
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSelectedColor(product?.colors?.[0] || '');
    setQuantity(1);
    setAdded(false);
  }, [product?.id]);

  const related = useMemo(() => {
    if (!product) return [];
    const sameCategory = products.filter(item => item.id !== product.id && item.category === product.category);
    const complementary = products.filter(item => item.id !== product.id && item.category !== product.category);
    return [...sameCategory, ...complementary].slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <main className="fs-shop-empty section">
        <div><p className="eyebrow">404</p><strong>Product not found.</strong><p>The product may have moved or the URL is incomplete.</p><Link className="btn btn-dark" to="/shop">Back to shop</Link></div>
      </main>
    );
  }

  const saved = wishlist.includes(product.id);
  const variant = variantPresets[selectedColor] || { hex: '#d9c5a7', imageFilter: 'none', overlayOpacity: 0 };

  function handleAdd() {
    addToCart(product.id, selectedColor, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  const variantStage = (detail = false) => {
    const source = detail ? (product.detailImage || product.image) : product.image;
    const fallback = detail
      ? (product.fallbackDetailImage || product.fallbackImage)
      : product.fallbackImage;

    return (
      <div
        className={`fs-product-shot ${detail ? 'detail' : ''} ${product.studioShot ? 'is-studio-shot' : ''} ${product.artwork ? 'is-artwork' : 'is-photo'}`}
        style={{ '--variant-hex': variant.hex, '--variant-opacity': variant.overlayOpacity ?? 0 }}
      >
        <img
          src={source}
          alt={detail ? '' : `${product.alt} in ${selectedColor}`}
          aria-hidden={detail || undefined}
          loading={detail ? 'lazy' : 'eager'}
          decoding="async"
          fetchPriority={detail ? 'auto' : 'high'}
          onError={(event) => {
            if (!fallback || event.currentTarget.dataset.fallbackApplied === 'true') return;
            event.currentTarget.dataset.fallbackApplied = 'true';
            event.currentTarget.src = fallback;
          }}
          style={{ filter: variant.imageFilter }}
        />
        <span className="variant-wash" aria-hidden="true" style={{ background: variant.hex, opacity: variant.overlayOpacity ?? 0 }}></span>
      </div>
    );
  };

  const purchaseContent = (mobile = false) => (
    <>
      <p className="eyebrow">{product.category} / Drop 01</p>
      <h1>{product.name}</h1>
      <div className="fs-buy-price-row"><strong className="fs-buy-price">{product.price} DH</strong><span>Tax included</span></div>
      <p className="fs-product-description">{product.description}</p>

      <div className="fs-option-block">
        <div className="fs-option-head"><span>Color</span><strong>{selectedColor}</strong></div>
        <div className="fs-pdp-swatches" role="group" aria-label="Choose color">
          {product.colors.map(color => {
            const preset = variantPresets[color] || { hex: '#d9c5a7' };
            const active = selectedColor === color;
            return (
              <button key={color} className={active ? 'active' : ''} type="button" aria-pressed={active} onClick={() => setSelectedColor(color)}>
                <span className="fs-pdp-swatch" style={{ background: preset.hex }} aria-hidden="true"></span>
                <span>{color}</span>
              </button>
            );
          })}
        </div>
        <div className="fs-variant-banner" aria-live={mobile ? 'off' : 'polite'}><i style={{ background: variant.hex }}></i><span>Previewing {selectedColor}. Product tone updates instantly.</span></div>
      </div>

      <div className="fs-option-block fs-material-row"><span>Material</span><strong>{product.material}</strong></div>

      <div className="fs-option-block fs-quantity-row">
        <div className="fs-option-head" style={{ margin: 0 }}><span>Quantity</span></div>
        <div className="fs-quantity-control" aria-label={`Quantity for ${product.name}`}>
          <button type="button" onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
          <span aria-live={mobile ? 'off' : 'polite'}>{quantity}</span>
          <button type="button" onClick={() => setQuantity(value => Math.min(10, value + 1))} aria-label="Increase quantity">+</button>
        </div>
      </div>

      <div className="fs-pdp-actions">
        <button className="btn btn-dark" type="button" onClick={handleAdd}>{added ? 'Added to bag ✓' : `Add to bag · ${product.price * quantity} DH`}</button>
        <button className={`fs-save-button ${saved ? 'saved' : ''}`} type="button" aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} onClick={() => toggleWishlist(product.id)}>{saved ? '♥' : '♡'}</button>
      </div>
      <p className="fs-pdp-status" aria-live={mobile ? 'off' : 'polite'}>{added ? `${quantity} ${quantity > 1 ? 'pieces' : 'piece'} added in ${selectedColor}.` : ''}</p>

      <div className="fs-pdp-meta">
        <div><span>Delivery</span><strong>Complimentary over 900 DH</strong></div>
        <div><span>Returns</span><strong>30 days</strong></div>
        <div><span>Availability</span><strong>Ready to ship</strong></div>
      </div>
    </>
  );

  return (
    <main className="fs-product-page fs-product-page-v2">
      <div className="fs-product-breadcrumb">
        <div className="shell"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span>{product.name}</span></div>
      </div>

      <section className="fs-product-layout fs-product-layout-v2">
        <div className="fs-product-gallery fs-product-gallery-v2" aria-label={`${product.name} gallery in ${selectedColor}`}>
          <div className="fs-product-gallery-heading">
            <span>OBJECT {String(products.findIndex(item => item.id === product.id) + 1).padStart(2, '0')} / DROP 01</span>
            <strong>{selectedColor} study</strong>
          </div>

          <div className="fs-product-primary-shot">{variantStage(false)}</div>

          <section className="fs-mobile-pdp-core" aria-label={`${product.name} purchase options`}>
            {purchaseContent(true)}
          </section>

          <div className="fs-product-detail-shot">{variantStage(true)}</div>

          <div className="fs-product-material-card" style={{ '--material-accent': variant.hex }}>
            <span>MATERIAL / FORM</span>
            <strong>{product.material}</strong>
            <p>Chosen for tactility, daily use and a clean finish that keeps the silhouette precise.</p>
          </div>

          <div className="fs-product-gallery-note">
            <span>OBJECT STUDY / {selectedColor.toUpperCase()}</span>
            <strong>Designed to be noticed quietly, then used every day.</strong>
          </div>
        </div>

        <aside className="fs-buy-panel fs-buy-panel-v2">
          {purchaseContent(false)}
        </aside>
      </section>

      <section className="fs-product-campaign-band">
        <div className="shell">
          <span>SAFRA / FÈS / 2026</span>
          <p>Modern accessories for a lighter tomorrow.</p>
          <Link to="/shop">Continue shopping ↗</Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="fs-related">
          <div className="shell">
            <div className="fs-section-head">
              <div><p className="eyebrow">Continue the edit</p><h2 className="fs-section-title">You may also like.</h2></div>
              <Link className="text-link" to="/shop">Shop all ↗</Link>
            </div>
            <div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item} />)}</div>
          </div>
        </section>
      )}

      <div className="fs-mobile-buybar" aria-label="Mobile purchase controls">
        <div>
          <span>{product.name} · {selectedColor}</span>
          <strong>{product.price * quantity} DH</strong>
        </div>
        <button type="button" onClick={handleAdd}>{added ? 'Added ✓' : 'Add to bag'}</button>
      </div>
    </main>
  );
}
