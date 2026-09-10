import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Checkout() {
  const { detailedCart, subtotal, clearCart } = useStore();
  const [complete, setComplete] = useState(false);
  const [errors, setErrors] = useState({});
  const shipping = subtotal >= 900 || subtotal === 0 ? 0 : 45;

  function submitOrder(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors = {};
    if ((form.get('name') || '').trim().length < 2) nextErrors.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test((form.get('email') || '').trim())) nextErrors.email = 'Enter a valid email.';
    if ((form.get('address') || '').trim().length < 8) nextErrors.address = 'Enter a complete delivery address.';
    if ((form.get('city') || '').trim().length < 2) nextErrors.city = 'Enter your city.';
    if (!/^[+0-9 ()-]{8,20}$/.test((form.get('phone') || '').trim())) nextErrors.phone = 'Enter a valid phone number.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      clearCart();
      setComplete(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (complete) {
    return (
      <main className="section checkout-page">
        <div className="shell checkout-success">
          <span className="success-mark">✓</span>
          <p className="eyebrow">Demo order confirmed</p>
          <h1>Thank you.</h1>
          <p>This is a portfolio checkout demonstration. No payment was collected and no personal data was sent to a server.</p>
          <Link className="btn btn-dark" to="/shop">Return to shop</Link>
        </div>
      </main>
    );
  }

  if (!detailedCart.length) {
    return (
      <main className="section"><div className="shell empty-state"><strong>Your bag is empty.</strong><p>Add something before opening checkout.</p><Link className="btn btn-dark" to="/shop">Shop now</Link></div></main>
    );
  }

  return (
    <main className="section checkout-page">
      <div className="shell">
        <div className="page-heading"><p className="eyebrow">Demo checkout</p><h1>Checkout</h1><p>No real payment or order submission is connected.</p></div>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submitOrder} noValidate>
            <h2>Delivery details</h2>
            <div className="checkout-fields">
              <label><span>Full name</span><input name="name" autoComplete="name" />{errors.name && <small>{errors.name}</small>}</label>
              <label><span>Email</span><input name="email" type="email" autoComplete="email" />{errors.email && <small>{errors.email}</small>}</label>
              <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" />{errors.phone && <small>{errors.phone}</small>}</label>
              <label><span>City</span><input name="city" autoComplete="address-level2" />{errors.city && <small>{errors.city}</small>}</label>
              <label className="full"><span>Address</span><input name="address" autoComplete="street-address" />{errors.address && <small>{errors.address}</small>}</label>
            </div>
            <h2>Payment</h2>
            <div className="payment-demo"><span>Demo mode</span><strong>No card details required</strong><p>In a real project, this area would connect to a payment provider such as Stripe or a supported local gateway.</p></div>
            <button className="btn btn-dark checkout-button" type="submit">Place demo order</button>
          </form>

          <aside className="checkout-summary">
            <h2>Order summary</h2>
            {detailedCart.map(item => (
              <div className="checkout-line" key={item.key}>
                <img src={item.product.image} alt="" />
                <span><strong>{item.product.name}</strong><small>{item.color || 'Standard'} · Qty {item.quantity}</small></span>
                <strong>{item.product.price * item.quantity} DH</strong>
              </div>
            ))}
            <div className="checkout-totals"><div><span>Subtotal</span><strong>{subtotal} DH</strong></div><div><span>Delivery</span><strong>{shipping ? `${shipping} DH` : 'Free'}</strong></div><div><span>Total</span><strong>{subtotal + shipping} DH</strong></div></div>
          </aside>
        </div>
      </div>
    </main>
  );
}
