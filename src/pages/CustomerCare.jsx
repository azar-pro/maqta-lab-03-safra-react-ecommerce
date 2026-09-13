import { Link } from 'react-router-dom';

const sections = [
  ['01', 'Delivery', 'Complimentary delivery is offered on demo orders over 900 DH. Smaller orders show a 45 DH delivery fee in the storefront checkout experience.'],
  ['02', 'Returns', 'The concept store presents a 30-day return window. In a production build, eligibility, condition requirements and refund timing would be connected to the real store policy.'],
  ['03', 'Orders', 'Cart and wishlist selections are stored locally in the browser for this portfolio demo. No order is sent to a server and no real payment is collected.'],
  ['04', 'Product care', 'Keep leather goods away from prolonged moisture and direct heat. Store eyewear in a protective case and wipe polished surfaces with a soft, dry cloth.'],
  ['05', 'Packaging', 'SAFRA is presented with paper-first packaging and a restrained unboxing direction designed to extend the visual identity beyond the screen.'],
];

export default function CustomerCare() {
  return (
    <main className="fs-aftercare-page">
      <section className="fs-aftercare-hero shell">
        <p className="eyebrow">SAFRA / Customer care</p>
        <h1>Everything after<br />the <em>add to bag.</em></h1>
        <p>Clear answers, quiet service and no unnecessary friction. This page completes the storefront journey with the information a real customer expects before ordering.</p>
      </section>

      <section className="shell fs-aftercare-list">
        {sections.map(([number, title, body]) => (
          <article className="fs-aftercare-row" key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="shell fs-aftercare-contact">
        <div><p className="eyebrow">Need another answer?</p><h2>Talk to SAFRA.</h2></div>
        <div><p>For sizing, delivery, product or order questions, use the contact form and choose the topic that fits best.</p><Link className="btn btn-dark" to="/contact">Contact us</Link></div>
      </section>
    </main>
  );
}
