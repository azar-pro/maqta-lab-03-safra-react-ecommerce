import { Link, useParams } from 'react-router-dom';

const content = {
  privacy: {
    eyebrow: 'SAFRA / Privacy',
    title: 'A demo with nothing to hide.',
    intro: 'SAFRA is a portfolio storefront. The demo does not send checkout, contact or newsletter data to a server.',
    sections: [
      ['Local storage', 'Cart and wishlist state may be stored locally in your browser so the storefront can preserve selections between visits.'],
      ['Forms', 'Checkout, contact and newsletter interactions are interface demonstrations only. No personal data is transmitted or retained by SAFRA.'],
      ['Production note', 'A live commerce implementation would require a complete privacy policy describing analytics, payment providers, customer accounts, retention and user rights.'],
    ],
  },
  terms: {
    eyebrow: 'SAFRA / Terms',
    title: 'Portfolio store terms.',
    intro: 'This website is a fictional commerce concept created to demonstrate design and frontend development capability.',
    sections: [
      ['No real sale', 'Products, prices, shipping promises and checkout interactions are illustrative. No purchase contract is created through this demo.'],
      ['No payment', 'The checkout does not request or process card information and no amount is charged.'],
      ['Creative concept', 'SAFRA, its products and campaign presentation are used as a portfolio concept for MAQTA Studio.'],
    ],
  },
};

export default function Legal({ type }) {
  const page = content[type] || content.privacy;
  return (
    <main className="fs-aftercare-page">
      <section className="fs-aftercare-hero shell">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>
      <section className="shell fs-aftercare-list">
        {page.sections.map(([title, body], index) => (
          <article className="fs-aftercare-row" key={title}>
            <span>0{index + 1}</span><h2>{title}</h2><p>{body}</p>
          </article>
        ))}
      </section>
      <section className="shell fs-aftercare-contact"><div><p className="eyebrow">Customer care</p><h2>Need more context?</h2></div><div><p>Return to customer care for shipping, returns and order information.</p><Link className="btn btn-dark" to="/customer-care">Customer care</Link></div></section>
    </main>
  );
}
