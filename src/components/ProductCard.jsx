import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { variantPresets } from '../data/products';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const [previewColor, setPreviewColor] = useState(product.colors?.[0] || '');
  const saved = wishlist.includes(product.id);
  const variant = variantPresets[previewColor] || { hex: '#d9c5a7', imageFilter: 'none' };

  function quickAdd() {
    addToCart(product.id, previewColor, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="product-card premium-card">
      <div className="product-media premium-card-media" style={{ '--variant-accent': variant.hex }}>
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={`${product.alt} in ${previewColor}`}
            loading="lazy"
            style={{ filter: variant.imageFilter }}
          />
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
        <button className="quick-add" type="button" onClick={quickAdd} aria-label={`Quick add ${product.name} in ${previewColor} to bag`}>
          {added ? 'Added ✓' : `Quick add · ${previewColor}`}
        </button>
      </div>
      <div className="product-info premium-card-info">
        <div className="product-copy-block">
          <p>{product.category}</p>
          <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
          <span className="product-material">{product.material}</span>
          {product.colors?.length > 1 && (
            <div className="card-swatches" aria-label={`Preview colors for ${product.name}`}>
              {product.colors.map(color => {
                const preset = variantPresets[color] || { hex: '#d9c5a7' };
                return (
                  <button
                    key={color}
                    type="button"
                    className={previewColor === color ? 'active' : ''}
                    onClick={() => setPreviewColor(color)}
                    aria-label={`Preview ${color}`}
                    aria-pressed={previewColor === color}
                    title={color}
                  >
                    <span style={{ background: preset.hex }}></span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <strong>{product.price} DH</strong>
      </div>
    </article>
  );
}
