import { Link, useLocation } from 'react-router-dom';

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString('en-US')} DH`;
}

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <main className="fs-aftercare-page fs-confirmation-empty">
        <section className="fs-aftercare-hero shell">
          <p className="eyebrow">Order confirmation</p>
          <h1>Your SAFRA order lives here.</h1>
          <p>This portfolio checkout keeps order details only for the current demo flow. Start with a piece from Drop 01 to see the complete confirmation experience.</p>
          <div className="fs-aftercare-actions">
            <Link className="btn btn-dark" to="/shop">Explore Drop 01</Link>
            <Link className="text-link" to="/">Back home</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="fs-confirmation-page">
      <section className="fs-confirmation-hero shell">
        <div className="fs-confirmation-mark" aria-hidden="true">✓</div>
        <p className="eyebrow">03 / Order confirmed</p>
        <h1>Thank you, {order.customer.firstName}.</h1>
        <p>Your SAFRA demo order is confirmed. No payment was collected and no personal information was transmitted to a server.</p>
        <div className="fs-confirmation-meta" aria-label="Order details">
          <div><span>Order</span><strong>{order.number}</strong></div>
          <div><span>Estimated delivery</span><strong>{order.deliveryWindow}</strong></div>
          <div><span>Total</span><strong>{formatMoney(order.total)}</strong></div>
        </div>
      </section>

      <section className="shell fs-confirmation-grid">
        <div className="fs-confirmation-card">
          <div className="fs-confirmation-card-head">
            <div><p className="eyebrow">Your edit</p><h2>Order summary</h2></div>
            <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} piece{order.items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? '' : 's'}</span>
          </div>

          <div className="fs-confirmation-lines">
            {order.items.map(item => (
              <article className="fs-confirmation-line" key={item.key}>
                <img src={item.image} alt="" width="88" height="110" />
                <div><strong>{item.name}</strong><span>{item.color || 'Standard'} · Qty {item.quantity}</span></div>
                <strong>{formatMoney(item.price * item.quantity)}</strong>
              </article>
            ))}
          </div>

          <div className="fs-confirmation-totals">
            <div><span>Subtotal</span><strong>{formatMoney(order.subtotal)}</strong></div>
            <div><span>Delivery</span><strong>{order.shipping ? formatMoney(order.shipping) : 'Complimentary'}</strong></div>
            <div className="total"><span>Total</span><strong>{formatMoney(order.total)}</strong></div>
          </div>
        </div>

        <aside className="fs-confirmation-card fs-confirmation-delivery">
          <p className="eyebrow">Delivery</p>
          <h2>Where it would go</h2>
          <address>
            <strong>{order.customer.name}</strong>
            <span>{order.customer.address}</span>
            <span>{order.customer.city}</span>
            <span>{order.customer.phone}</span>
            <span>{order.customer.email}</span>
          </address>
          <div className="fs-confirmation-note">
            <span>Demo storefront</span>
            <p>This confirmation is intentionally client-side only. A production build would create the order securely on a server and send transactional email.</p>
          </div>
        </aside>
      </section>

      <section className="shell fs-confirmation-next">
        <div><p className="eyebrow">Continue</p><h2>The next object is waiting.</h2></div>
        <div className="fs-aftercare-actions"><Link className="btn btn-dark" to="/shop">Continue exploring</Link><Link className="text-link" to="/about">Our point of view</Link></div>
      </section>
    </main>
  );
}
