import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
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

  function handleAdd() {
    addToCart(product.id, selectedColor, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main>
      <section className="product-detail section">
        <div className="shell product-detail-grid">
          <div className="product-detail-media">
            <img src={product.image} alt={product.alt} />
            {product.badge && <span className="product-badge">{product.badge}</span>}
            <span className="product-media-index">SAFRA / {String(products.findIndex(item => item.id === product.id) + 1).padStart(2, '0')}</span>
          </div>

          <div className="product-detail-copy">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span aria-current="page">{product.name}</span>
            </nav>

            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <div className="product-price">{product.price} DH</div>
            <p className="product-description">{product.description}</p>

            <div className="detail-block">
              <div className="detail-label-row"><span>Color</span><strong>{selectedColor}</strong></div>
              <div className="color-options" role="group" aria-label="Choose color">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={selectedColor === color ? 'active' : ''}
                    type="button"
                    aria-pressed={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  >
                    <span className={`color-dot color-${color.toLowerCase().replaceAll(' ', '-')}`} aria-hidden="true"></span>
                    {color}
                  </button>
                ))}
              </div>
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

            <div className="product-actions">
              <button className="btn btn-dark add-button" type="button" onClick={handleAdd}>{added ? 'Added to bag ✓' : `Add to bag · ${product.price * quantity} DH`}</button>
              <button className={`save-detail ${saved ? 'saved' : ''}`} type="button" aria-pressed={saved} onClick={() => toggleWishlist(product.id)}>{saved ? '♥ Saved' : '♡ Save'}</button>
            </div>
            <p className="add-status" aria-live="polite">{added ? `${quantity} ${quantity > 1 ? 'items' : 'item'} added in ${selectedColor}.` : ''}</p>

            <div className="product-assurances" aria-label="Shopping assurances">
              <div><span>01</span><strong>Free delivery</strong><small>Orders over 900 DH</small></div>
              <div><span>02</span><strong>30-day returns</strong><small>On this demo store</small></div>
              <div><span>03</span><strong>Saved locally</strong><small>Your bag survives refresh</small></div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section related-section">
          <div className="shell">
            <div className="section-head"><div><p className="eyebrow">You may also like</p><h2>Same mood.</h2></div><Link className="text-link" to="/shop">Explore all ↗</Link></div>
            <div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item} />)}</div>
          </div>
        </section>
      )}
    </main>
  );
}
