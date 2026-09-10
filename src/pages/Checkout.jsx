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
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
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
      return;
    }

    window.requestAnimationFrame(() => {
      const firstInvalid = formElement.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
    });
  }

  if (complete) {
    return (
      <main className="section checkout-page">
        <div className="shell checkout-success">
          <span className="success-mark" aria-hidden="true">✓</span>
          <p className="eyebrow">Demo order confirmed</p>
          <h1>Thank you.</h1>
          <p>Your SAFRA demo order is complete. No payment was collected and no personal data was sent to a server.</p>
          <div className="success-actions"><Link className="btn btn-dark" to="/shop">Return to shop</Link><Link className="text-link" to="/">Back home</Link></div>
        </div>
      </main>
    );
  }

  if (!detailedCart.length) {
    return (
      <main className="section"><div className="shell empty-state empty-state-card"><span className="empty-icon" aria-hidden="true">＋</span><strong>Your bag is empty.</strong><p>Add something before opening checkout.</p><Link className="btn btn-dark" to="/shop">Shop now</Link></div></main>
    );
  }

  return (
    <main className="section checkout-page">
      <div className="shell">
        <div className="page-heading checkout-heading">
          <div><p className="eyebrow">Demo checkout</p><h1>Checkout</h1></div>
          <div className="checkout-steps" aria-label="Checkout progress"><span className="active">01 Details</span><span>02 Demo payment</span><span>03 Complete</span></div>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submitOrder} noValidate>
            <div className="form-section-heading"><span>01</span><div><h2>Delivery details</h2><p>Where this fictional order would be delivered.</p></div></div>

            <div className="checkout-fields">
              <label>
                <span>Full name</span>
                <input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                {errors.name && <small id="name-error" role="alert">{errors.name}</small>}
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                {errors.email && <small id="email-error" role="alert">{errors.email}</small>}
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                {errors.phone && <small id="phone-error" role="alert">{errors.phone}</small>}
              </label>
              <label>
                <span>City</span>
                <input name="city" autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'city-error' : undefined} />
                {errors.city && <small id="city-error" role="alert">{errors.city}</small>}
              </label>
              <label className="full">
                <span>Address</span>
                <input name="address" autoComplete="street-address" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'address-error' : undefined} />
                {errors.address && <small id="address-error" role="alert">{errors.address}</small>}
              </label>
            </div>

            <div className="form-section-heading payment-heading"><span>02</span><div><h2>Payment</h2><p>Portfolio demonstration only.</p></div></div>
            <div className="payment-demo">
              <span className="payment-badge">Demo mode</span>
              <strong>No card details required</strong>
              <p>In a real project, this section would connect to Stripe or a supported local payment gateway and use a secure server-side payment flow.</p>
              <div className="payment-fake-row" aria-hidden="true"><span>•••• •••• •••• ••••</span><span>MM / YY</span><span>CVC</span></div>
            </div>

            <button className="btn btn-dark checkout-button" type="submit">Place demo order · {subtotal + shipping} DH</button>
            <p className="checkout-disclaimer">By continuing, you are only testing the front-end checkout experience. Nothing is transmitted or charged.</p>
          </form>

          <aside className="checkout-summary">
            <div className="checkout-summary-head"><h2>Order summary</h2><Link to="/cart">Edit bag</Link></div>
            {detailedCart.map(item => (
              <div className="checkout-line" key={item.key}>
                <img src={item.product.image} alt="" />
                <span><strong>{item.product.name}</strong><small>{item.color || 'Standard'} · Qty {item.quantity}</small></span>
                <strong>{item.product.price * item.quantity} DH</strong>
              </div>
            ))}
            <div className="checkout-totals">
              <div><span>Subtotal</span><strong>{subtotal} DH</strong></div>
              <div><span>Delivery</span><strong>{shipping ? `${shipping} DH` : 'Free'}</strong></div>
              <div><span>Total</span><strong>{subtotal + shipping} DH</strong></div>
            </div>
            <div className="checkout-trust"><span>30-day returns</span><span>Local cart storage</span><span>No real payment</span></div>
          </aside>
        </div>
      </div>
    </main>
  );
}
