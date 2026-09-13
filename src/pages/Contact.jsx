import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function submitContact(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="fs-aftercare-page">
      <section className="fs-aftercare-hero shell">
        <p className="eyebrow">SAFRA / Contact</p>
        <h1>A simple line<br />to the <em>studio.</em></h1>
        <p>Questions about a piece, delivery or an order? Send a note below. This is a portfolio contact experience and does not transmit data to a server.</p>
      </section>

      <section className="shell fs-contact-grid">
        <div className="fs-contact-aside">
          <p className="eyebrow">Contact notes</p>
          <h2>Fès, Morocco</h2>
          <p>Online concept store<br />Drop 01 / 2026</p>
          <div className="fs-contact-smallprint">Demo storefront · No message is actually sent.</div>
        </div>

        <div className="fs-contact-panel">
          {sent ? (
            <div className="fs-contact-success" role="status">
              <span aria-hidden="true">✓</span>
              <p className="eyebrow">Message prepared</p>
              <h2>Thank you.</h2>
              <p>In a production storefront, this message would now be delivered to the customer-care inbox. Nothing was transmitted from this demo.</p>
              <button className="text-link" type="button" onClick={() => setSent(false)}>Send another note →</button>
            </div>
          ) : (
            <form className="fs-contact-form" onSubmit={submitContact}>
              <label><span>Name</span><input name="name" autoComplete="name" required minLength="2" /></label>
              <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
              <label className="full"><span>Topic</span><select name="topic" defaultValue="Product question"><option>Product question</option><option>Delivery & returns</option><option>Order help</option><option>Press & collaboration</option><option>Other</option></select></label>
              <label className="full"><span>Message</span><textarea name="message" rows="6" required minLength="10" /></label>
              <button className="btn btn-dark" type="submit">Send note</button>
              <small>Demo only — no data leaves your browser.</small>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
