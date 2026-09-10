import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { variantPresets } from '../data/products';

export default function Cart() {
  const { detailedCart, subtotal, updateQuantity, removeFromCart } = useStore();
  const shippingThreshold = 900;
  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 45;
  const total = subtotal + shipping;
  const remaining = Math.max(0, shippingThreshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  if (!detailedCart.length) {
    return (
      <main className="fs-cart-empty">
        <div className="shell fs-wishlist-empty">
          <div className="fs-wishlist-empty-media" aria-hidden="true"></div>
          <div className="fs-wishlist-empty-copy">
            <p className="eyebrow">Your bag is empty</p>
            <h2>Start with one good object.</h2>
            <p>Build your edit from the latest SAFRA collection. Your bag will stay saved on this device while you browse.</p>
            <Link className="btn btn-dark" to="/shop">Shop the collection</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="fs-cart-page">
      <section className="fs-cart-hero">
        <div className="shell fs-cart-hero-inner">
          <div>
            <p className="eyebrow">Your selection</p>
            <h1 className="fs-cart-title">Bag</h1>
          </div>
          <p>{detailedCart.length} {detailedCart.length === 1 ? 'style' : 'styles'} selected. Review color, quantity and delivery before continuing.</p>
        </div>
      </section>

      <section className="shell fs-cart-body">
        <div>
          <div className="fs-shipping-progress" aria-live="polite">
            <div className="fs-shipping-progress-copy">
              <strong>{remaining > 0 ? `${remaining} DH to complimentary delivery` : 'Complimentary delivery unlocked'}</strong>
              <span>{progress}%</span>
            </div>
            <div className="fs-shipping-track" aria-hidden="true"><span style={{ width: `${progress}%` }}></span></div>
          </div>

          <div className="fs-cart-list" aria-label="Bag items">
            {detailedCart.map(item => {
              const variant = variantPresets[item.color] || { hex: '#d9c5a7', imageFilter: 'none', overlayOpacity: 0 };
              return (
                <article className="fs-cart-item" key={item.key}>
                  <Link to={`/product/${item.product.id}`} className="fs-cart-image" style={{ background: variant.hex }}>
                    <img src={item.product.image} alt={item.product.alt} style={{ filter: variant.imageFilter }} />
                    <span className="variant-wash" aria-hidden="true" style={{ background: variant.hex, opacity: variant.overlayOpacity ?? 0 }}></span>
                  </Link>

                  <div className="fs-cart-item-main">
                    <div>
                      <p>{item.product.category}</p>
                      <h2><Link to={`/product/${item.product.id}`}>{item.product.name}</Link></h2>
                      <small>{item.color || 'Standard'} · {item.product.material}</small>
                    </div>

                    <div className="fs-cart-item-bottom">
                      <div className="fs-quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                        <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <button className="fs-cart-remove" type="button" onClick={() => removeFromCart(item.key)}>Remove</button>
                    </div>
                  </div>

                  <div className="fs-cart-item-price">
                    <strong>{item.product.price * item.quantity} DH</strong>
                    <span>{item.product.price} DH each</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="fs-cart-summary">
          <p className="eyebrow">Order summary</p>
          <h2>Ready when you are.</h2>
          <div className="fs-summary-line"><span>Subtotal</span><strong>{subtotal} DH</strong></div>
          <div className="fs-summary-line"><span>Delivery</span><strong>{shipping === 0 ? 'Complimentary' : `${shipping} DH`}</strong></div>
          <div className="fs-summary-total"><span>Total</span><strong>{total} DH</strong></div>
          <Link className="btn" to="/checkout">Continue to checkout</Link>
          <p className="fs-summary-note">Portfolio checkout demonstration. No real payment is collected.</p>
        </aside>
      </section>
    </main>
  );
}
