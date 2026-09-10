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

  const related = useMemo(() => product
    ? products.filter(item => item.category === product.category && item.id !== product.id).slice(0, 3)
    : [], [product]);

  if (!product) {
    return (
      <main className="section">
        <div className="shell empty-state">
          <p className="eyebrow">404</p>
          <strong>Product not found.</strong>
          <p>The product may have moved or the URL is incomplete.</p>
          <Link className="btn btn-dark" to="/shop">Back to shop</Link>
        </div>
      </main>
    );
  }

  const saved = wishlist.includes(product.id);
  const variant = variantPresets[selectedColor] || { hex: '#d9c5a7', imageFilter: 'none' };

  function handleAdd() {
    addToCart(product.id, selectedColor, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main>
      <section className="product-detail section premium-product-detail">
        <div className="shell product-detail-grid premium-product-grid">
          <div
            className="product-detail-media premium-product-media"
            style={{ '--variant-accent': variant.hex }}
          >
            <img
              src={product.image}
              alt={`${product.alt} in ${selectedColor}`}
              style={{ filter: variant.imageFilter }}
            />
            {product.badge && <span className="product-badge">{product.badge}</span>}
            <span className="product-media-index">SAFRA / {String(products.findIndex(item => item.id === product.id) + 1).padStart(2, '0')}</span>
            <div className="variant-preview-chip" aria-live="polite">
              <span style={{ background: variant.hex }} aria-hidden="true"></span>
              Previewing {selectedColor}
            </div>
          </div>

          <div className="product-detail-copy premium-product-copy">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span aria-current="page">{product.name}</span>
            </nav>

            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <div className="premium-price-row">
              <div className="product-price">{product.price} DH</div>
              <span>Tax included</span>
            </div>
            <p className="product-description">{product.description}</p>

            <div className="detail-block premium-color-block">
              <div className="detail-label-row"><span>Choose color</span><strong>{selectedColor}</strong></div>
              <div className="color-options premium-swatches" role="group" aria-label="Choose color">
                {product.colors.map(color => {
                  const preset = variantPresets[color] || { hex: '#d9c5a7' };
                  const active = selectedColor === color;
                  return (
                    <button
                      key={color}
                      className={active ? 'active' : ''}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span className="premium-swatch" style={{ background: preset.hex }} aria-hidden="true"></span>
                      <span>{color}</span>
                      {active && <span className="swatch-check" aria-hidden="true">✓</span>}
                    </button>
                  );
                })}
              </div>
              <p className="variant-note">Color preview is simulated for this portfolio prototype. A production store would use dedicated photography for each variant.</p>
            </div>

            <div className="detail-block detail-row">
              <span>Material</span><strong>{product.material}</strong>
            </div>

            <div className="detail-block quantity-block">
              <span>Quantity</span>
              <div className="quantity-control detail-quantity" aria-label={`Quantity for ${product.name}`}>
                <button type="button" onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity(value => Math.min(10, value + 1))} aria-label="Increase quantity">+</button>
              </div>
            </div>

            <div className="product-actions premium-product-actions">
              <button className="btn btn-dark add-button" type="button" onClick={handleAdd}>{added ? 'Added to bag ✓' : `Add to bag · ${product.price * quantity} DH`}</button>
              <button className={`save-detail ${saved ? 'saved' : ''}`} type="button" aria-pressed={saved} onClick={() => toggleWishlist(product.id)}>{saved ? '♥ Saved' : '♡ Save'}</button>
            </div>
            <p className="add-status" aria-live="polite">{added ? `${quantity} ${quantity > 1 ? 'items' : 'item'} added in ${selectedColor}.` : ''}</p>

            <div className="product-assurances premium-assurances" aria-label="Shopping assurances">
              <div><span>01</span><strong>Complimentary delivery</strong><small>On orders over 900 DH</small></div>
              <div><span>02</span><strong>30-day returns</strong><small>Simple demo return policy</small></div>
              <div><span>03</span><strong>Persistent bag</strong><small>Saved locally between visits</small></div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section related-section premium-related">
          <div className="shell">
            <div className="section-head"><div><p className="eyebrow">You may also like</p><h2>Continue the edit.</h2></div><Link className="text-link" to="/shop">Explore all ↗</Link></div>
            <div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item} />)}</div>
          </div>
        </section>
      )}
    </main>
  );
}
