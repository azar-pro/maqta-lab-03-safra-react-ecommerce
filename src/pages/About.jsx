import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main>
      <section className="about-hero">
        <div className="shell about-hero-grid">
          <div>
            <p className="eyebrow">About SAFRA</p>
            <h1>Retail with<br />a graphic pulse.</h1>
          </div>
          <p>SAFRA is a fictional accessories brand created to practice building a polished React storefront where editorial identity and practical shopping flows work together.</p>
        </div>
      </section>

      <section className="about-image" aria-label="Fashion accessories editorial composition"></section>

      <section className="section">
        <div className="shell about-content-grid">
          <div><p className="eyebrow">01 · Direction</p><h2>Simple interface.<br />Expressive brand.</h2></div>
          <div className="rich-copy">
            <p>The concept is intentionally different from a neutral marketplace. Strong typography, oversized image crops and sharp accent color give SAFRA a recognisable point of view.</p>
            <p>At the same time, core commerce actions stay familiar: clear prices, obvious filters, persistent cart state, simple variants and an uncluttered checkout path.</p>
          </div>
        </div>
      </section>

      <section className="values-band">
        <div className="shell values-grid">
          <article><span>01</span><h3>Useful</h3><p>Every feature has a shopping reason to exist.</p></article>
          <article><span>02</span><h3>Graphic</h3><p>Brand personality is carried by scale, spacing and contrast.</p></article>
          <article><span>03</span><h3>Responsive</h3><p>The same visual logic adapts cleanly from desktop to phone.</p></article>
          <article><span>04</span><h3>Stateful</h3><p>Cart and wishlist persist through localStorage.</p></article>
        </div>
      </section>

      <section className="section">
        <div className="shell large-cta"><h2>See the storefront in action.</h2><Link className="btn btn-dark" to="/shop">Explore the shop</Link></div>
      </section>
    </main>
  );
}
