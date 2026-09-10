import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(item => item.id === id);
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [added, setAdded] = useState(false);

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
    addToCart(product.id, selectedColor);
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
          </div>

          <div className="product-detail-copy">
            <Link className="back-link" to="/shop">← Back to shop</Link>
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <div className="product-price">{product.price} DH</div>
            <p className="product-description">{product.description}</p>

            <div className="detail-block">
              <span>Color</span>
              <div className="color-options">
                {product.colors.map(color => (
                  <button key={color} className={selectedColor === color ? 'active' : ''} type="button" onClick={() => setSelectedColor(color)}>{color}</button>
                ))}
              </div>
            </div>

            <div className="detail-block detail-row">
              <span>Material</span><strong>{product.material}</strong>
            </div>

            <div className="product-actions">
              <button className="btn btn-dark add-button" type="button" onClick={handleAdd}>{added ? 'Added to bag ✓' : 'Add to bag'}</button>
              <button className={`save-detail ${saved ? 'saved' : ''}`} type="button" onClick={() => toggleWishlist(product.id)}>{saved ? '♥ Saved' : '♡ Save'}</button>
            </div>

            <div className="delivery-note">
              <span>Complimentary delivery over 900 DH</span>
              <span>30-day returns on this fictional store</span>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section related-section">
          <div className="shell">
            <div className="section-head"><div><p className="eyebrow">You may also like</p><h2>Same mood.</h2></div></div>
            <div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item} />)}</div>
          </div>
        </section>
      )}
    </main>
  );
}
