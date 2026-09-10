import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { detailedCart, subtotal, updateQuantity, removeFromCart } = useStore();
  const shippingThreshold = 900;
  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 45;
  const total = subtotal + shipping;
  const remaining = Math.max(0, shippingThreshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  if (!detailedCart.length) {
    return (
      <main className="section cart-page">
        <div className="shell empty-state empty-state-card">
          <span className="empty-icon" aria-hidden="true">＋</span>
          <p className="eyebrow">Your bag</p>
          <strong>Your bag is empty.</strong>
          <p>Start with the latest SAFRA edit and build a small collection of useful pieces.</p>
          <Link className="btn btn-dark" to="/shop">Shop the collection</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section cart-page">
      <div className="shell">
        <div className="page-heading cart-heading">
          <div><p className="eyebrow">Your bag</p><h1>Cart</h1></div>
          <p>{detailedCart.length} {detailedCart.length === 1 ? 'style' : 'styles'} selected · saved locally on this device.</p>
        </div>

        <div className="shipping-progress-card" aria-live="polite">
          <div className="shipping-progress-copy">
            <strong>{remaining > 0 ? `${remaining} DH away from free delivery` : 'Complimentary delivery unlocked'}</strong>
            <span>{remaining > 0 ? 'Add another piece to remove the 45 DH delivery fee.' : 'Your order qualifies for free delivery.'}</span>
          </div>
          <div className="shipping-track" aria-hidden="true"><span style={{ width: `${progress}%` }}></span></div>
        </div>

        <div className="cart-layout">
          <div className="cart-list" aria-label="Bag items">
            {detailedCart.map(item => (
              <article className="cart-item" key={item.key}>
                <Link to={`/product/${item.product.id}`} className="cart-image"><img src={item.product.image} alt={item.product.alt} /></Link>
                <div className="cart-copy">
                  <div>
                    <p>{item.product.category}</p>
                    <h2><Link to={`/product/${item.product.id}`}>{item.product.name}</Link></h2>
                    <span>{item.color || 'Standard'} · {item.product.material}</span>
                  </div>
                  <div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                    <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <div className="cart-price">
                  <strong>{item.product.price * item.quantity} DH</strong>
                  <span>{item.product.price} DH each</span>
                  <button type="button" onClick={() => removeFromCart(item.key)}>Remove</button>
                </div>
              </article>
            ))}
          </div>

          <aside className="order-summary">
            <p className="eyebrow">Summary</p>
            <div><span>Subtotal</span><strong>{subtotal} DH</strong></div>
            <div><span>Delivery</span><strong>{shipping === 0 ? 'Free' : `${shipping} DH`}</strong></div>
            <div className="summary-total"><span>Total</span><strong>{total} DH</strong></div>
            {subtotal < shippingThreshold && <p className="shipping-hint">Add {remaining} DH more for complimentary delivery.</p>}
            <Link className="btn btn-dark checkout-button" to="/checkout">Continue to checkout</Link>
            <Link className="text-link centered" to="/shop">Continue shopping</Link>
            <div className="summary-assurance">
              <span>Demo checkout</span>
              <span>No payment collected</span>
              <span>Cart saved in your browser</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
