import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { variantPresets } from '../data/products';

export default function ProductCard({ product, priority = false }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const [previewColor, setPreviewColor] = useState(product.colors?.[0] || '');
  const saved = wishlist.includes(product.id);

  function quickAdd() {
    addToCart(product.id, previewColor, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  function useFallbackImage(event) {
    const img = event.currentTarget;
    if (img.dataset.fallbackStage === 'legacy') return;

    if (img.dataset.fallbackStage !== 'photo' && product.photoFallback) {
      img.dataset.fallbackStage = 'photo';
      img.src = product.photoFallback;
      return;
    }

    if (product.image) {
      img.dataset.fallbackStage = 'legacy';
      img.src = product.image;
    }
  }

  return (
    <article className={`flagship-product-card ${product.studioShot ? 'is-studio-shot' : ''}`}>
      <div className="flagship-product-media">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <div className="flagship-image-stage">
            <img
              src={product.photo || product.photoFallback || product.image}
              alt={`${product.alt}. Selected color: ${previewColor}.`}
              width="1122"
              height="1402"
              sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={priority ? 'high' : 'auto'}
              onError={useFallbackImage}
            />
          </div>
        </Link>

        <span className="flagship-product-index">SAFRA / {product.category}</span>
        {product.badge && <span className="flagship-product-badge">{product.badge}</span>}

        <button
          className={`flagship-wish ${saved ? 'saved' : ''}`}
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product.id)}
        >
          {saved ? '♥' : '♡'}
        </button>

        <button
          className="flagship-quick-add"
          type="button"
          onClick={quickAdd}
          aria-label={`Quick add ${product.name} in ${previewColor} to bag`}
        >
          {added ? 'Added to bag ✓' : `Quick add · ${previewColor}`}
        </button>
      </div>

      <div className="flagship-product-info">
        <div>
          <p>{product.material}</p>
          <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
          <div className="flagship-card-swatches" aria-label={`Choose color for ${product.name}`}>
            {product.colors.map(color => {
              const preset = variantPresets[color] || { hex: '#d9c5a7' };
              const active = previewColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  className={active ? 'active' : ''}
                  onClick={() => setPreviewColor(color)}
                  aria-label={`Select ${color}`}
                  aria-pressed={active}
                  title={color}
                >
                  <span style={{ background: preset.hex }}></span>
                </button>
              );
            })}
            <span className="flagship-card-color-name">{previewColor}</span>
          </div>
        </div>
        <strong>{product.price} DH</strong>
      </div>
    </article>
  );
}
