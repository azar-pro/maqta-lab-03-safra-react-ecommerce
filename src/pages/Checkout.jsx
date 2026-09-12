import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { variantPresets } from '../data/products';

export default function Checkout() {
  const { detailedCart, subtotal, clearCart } = useStore();
  const [complete, setComplete] = useState(false);
  const [errors, setErrors] = useState({});
  const shipping = subtotal >= 900 || subtotal === 0 ? 0 : 45;
  const total = subtotal + shipping;

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
      <main className="fs-checkout-success">
        <div className="fs-checkout-success-inner">
          <span className="fs-success-mark" aria-hidden="true">✓</span>
          <p className="eyebrow">Demo order confirmed</p>
          <h1>Thank you.</h1>
          <p>Your SAFRA demo order is complete. No payment was collected and no personal information was transmitted to a server.</p>
          <div className="fs-success-actions"><Link className="btn btn-dark" to="/shop">Continue exploring</Link><Link className="text-link" to="/">Back home</Link></div>
        </div>
      </main>
    );
  }

  if (!detailedCart.length) {
    return (
      <main className="fs-cart-empty">
        <div className="shell fs-wishlist-empty-copy" style={{ marginInline: 'auto', maxWidth: 760, textAlign: 'center', alignItems: 'center' }}>
          <p className="eyebrow">Checkout</p>
          <h2>Your bag is empty.</h2>
          <p>Choose a piece before continuing to checkout.</p>
          <Link className="btn btn-dark" to="/shop">Explore Drop 01</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fs-checkout-page">
      <header className="fs-checkout-top">
        <div className="fs-checkout-top-inner">
          <div><p className="eyebrow">SAFRA / Demo checkout</p><h1 className="fs-checkout-title">Checkout</h1></div>
          <div className="fs-checkout-steps" aria-label="Checkout progress"><span className="active">01 Details</span><span>02 Demo payment</span><span>03 Complete</span></div>
        </div>
      </header>

      <section className="fs-checkout-layout">
        <div className="fs-checkout-form-wrap">
          <form id="checkout-form" className="fs-checkout-form" onSubmit={submitOrder} noValidate>
            <section className="fs-form-section">
              <div className="fs-form-section-head"><span className="fs-form-number">01</span><div><h2>Delivery details</h2><p>Where this concept order would be delivered.</p></div></div>
              <div className="fs-checkout-fields">
                <label><span>Full name</span><input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <small id="name-error" role="alert">{errors.name}</small>}</label>
                <label><span>Email</span><input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <small id="email-error" role="alert">{errors.email}</small>}</label>
                <label><span>Phone</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{errors.phone && <small id="phone-error" role="alert">{errors.phone}</small>}</label>
                <label><span>City</span><input name="city" autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'city-error' : undefined} />{errors.city && <small id="city-error" role="alert">{errors.city}</small>}</label>
                <label className="full"><span>Address</span><input name="address" autoComplete="street-address" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'address-error' : undefined} />{errors.address && <small id="address-error" role="alert">{errors.address}</small>}</label>
              </div>
            </section>

            <section className="fs-form-section">
              <div className="fs-form-section-head"><span className="fs-form-number">02</span><div><h2>Payment</h2><p>Visual demonstration only — no card details are requested.</p></div></div>
              <div className="fs-payment-demo">
                <span className="fs-payment-demo-badge">Demo mode</span>
                <strong>No card details required</strong>
                <p>A production storefront would connect this step to a secure payment provider through a server-side payment flow.</p>
                <div className="fs-payment-ghost" aria-hidden="true"><span>•••• •••• •••• ••••</span><span>MM / YY</span><span>CVC</span></div>
              </div>
            </section>

            <button className="btn btn-dark fs-place-order fs-desktop-order-submit" type="submit">Place demo order · {total} DH</button>
            <p className="fs-checkout-disclaimer fs-desktop-order-submit">Nothing is charged or transmitted. This page demonstrates interface, validation and commerce state only.</p>
          </form>
        </div>

        <aside className="fs-checkout-summary">
          <div className="fs-checkout-summary-inner">
            <div className="fs-checkout-summary-head"><h2>Your order</h2><Link to="/cart">Edit bag</Link></div>

            {detailedCart.map(item => {
              const variant = variantPresets[item.color] || { imageFilter: 'none' };
              return (
                <div className={`fs-checkout-line ${item.product.studioShot ? 'is-studio-shot' : ''}`} key={item.key}>
                  <img src={item.product.image} alt="" style={{ filter: variant.imageFilter }} />
                  <span><strong>{item.product.name}</strong><small>{item.color || 'Standard'} · Qty {item.quantity}</small></span>
                  <strong>{item.product.price * item.quantity} DH</strong>
                </div>
              );
            })}

            <div className="fs-checkout-totals">
              <div><span>Subtotal</span><strong>{subtotal} DH</strong></div>
              <div><span>Delivery</span><strong>{shipping ? `${shipping} DH` : 'Complimentary'}</strong></div>
              <div><span>Total</span><strong>{total} DH</strong></div>
            </div>

            <div className="fs-checkout-trust"><span>30-day returns</span><span>Local cart storage</span><span>No real payment</span></div>
            <button className="btn btn-light fs-place-order fs-mobile-order-submit" type="submit" form="checkout-form">Place demo order · {total} DH</button>
            <p className="fs-checkout-disclaimer fs-mobile-order-submit">Nothing is charged or transmitted. This page demonstrates interface, validation and commerce state only.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
