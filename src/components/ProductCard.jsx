import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const saved = wishlist.includes(product.id);

  function quickAdd() {
    addToCart(product.id, product.colors?.[0] || '', 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="product-card">
      <div className="product-media">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.alt} loading="lazy" />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`wish-button ${saved ? 'saved' : ''}`}
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product.id)}
        >
          {saved ? '♥' : '♡'}
        </button>
        <button className="quick-add" type="button" onClick={quickAdd} aria-label={`Quick add ${product.name} to bag`}>
          {added ? 'Added ✓' : 'Quick add'}
        </button>
      </div>
      <div className="product-info">
        <div>
          <p>{product.category}</p>
          <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
          <span className="product-material">{product.material}</span>
        </div>
        <strong>{product.price} DH</strong>
      </div>
    </article>
  );
}
