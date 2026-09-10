import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { detailedCart, subtotal, updateQuantity, removeFromCart } = useStore();
  const shipping = subtotal >= 900 || subtotal === 0 ? 0 : 45;
  const total = subtotal + shipping;

  if (!detailedCart.length) {
    return (
      <main className="section cart-page">
        <div className="shell empty-state">
          <p className="eyebrow">Your bag</p>
          <strong>Your bag is empty.</strong>
          <p>Start with the latest SAFRA edit.</p>
          <Link className="btn btn-dark" to="/shop">Shop the collection</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section cart-page">
      <div className="shell">
        <div className="page-heading"><p className="eyebrow">Your bag</p><h1>Cart</h1></div>
        <div className="cart-layout">
          <div className="cart-list">
            {detailedCart.map(item => (
              <article className="cart-item" key={item.key}>
                <Link to={`/product/${item.product.id}`} className="cart-image"><img src={item.product.image} alt={item.product.alt} /></Link>
                <div className="cart-copy">
                  <div><p>{item.product.category}</p><h2><Link to={`/product/${item.product.id}`}>{item.product.name}</Link></h2><span>{item.color || 'Standard'}</span></div>
                  <div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <div className="cart-price"><strong>{item.product.price * item.quantity} DH</strong><button onClick={() => removeFromCart(item.key)}>Remove</button></div>
              </article>
            ))}
          </div>

          <aside className="order-summary">
            <p className="eyebrow">Summary</p>
            <div><span>Subtotal</span><strong>{subtotal} DH</strong></div>
            <div><span>Delivery</span><strong>{shipping === 0 ? 'Free' : `${shipping} DH`}</strong></div>
            <div className="summary-total"><span>Total</span><strong>{total} DH</strong></div>
            {subtotal < 900 && <p className="shipping-hint">Add {900 - subtotal} DH more for complimentary delivery.</p>}
            <Link className="btn btn-dark checkout-button" to="/checkout">Continue to checkout</Link>
            <Link className="text-link centered" to="/shop">Continue shopping</Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
