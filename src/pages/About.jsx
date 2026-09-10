import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    ['01', 'Purpose', 'Every interface decision supports browsing, comparison or purchase.'],
    ['02', 'Restraint', 'Typography, spacing and photography create character without clutter.'],
    ['03', 'Rhythm', 'Large editorial moments alternate with precise commerce information.'],
    ['04', 'Memory', 'Wishlist and bag state persist locally between visits.'],
  ];

  return (
    <main>
      <section className="fs-about-hero" aria-labelledby="about-title">
        <div className="shell fs-about-hero-inner">
          <p className="eyebrow">About SAFRA</p>
          <h1 className="fs-about-display" id="about-title">A retail identity<br />with <em>presence.</em></h1>
          <div className="fs-about-hero-foot">
            <p>SAFRA is a fictional accessories brand built around a simple belief: a digital store can feel editorial, expressive and premium without making shopping difficult.</p>
            <span>FÈS / MOROCCO · EST. 2026</span>
          </div>
        </div>
      </section>

      <section className="fs-about-story">
        <div className="shell fs-about-story-grid">
          <p className="eyebrow">01 / Direction</p>
          <h2>Commerce first.<br /><em>Identity always.</em></h2>
          <div className="fs-about-story-copy">
            <p>The project explores the visual language of high-end international e-commerce: confident typography, controlled whitespace, immersive photography, asymmetrical grids and clear purchasing hierarchy.</p>
            <p>Rather than reproducing a specific brand, SAFRA uses those principles to create its own system — warmer, more tactile and rooted in a contemporary Moroccan point of view.</p>
          </div>
        </div>
      </section>

      <section className="fs-about-manifesto">
        <div className="fs-about-manifesto-head">
          <div><p className="eyebrow" style={{ color: '#df9787' }}>02 / Principles</p><h2>Designed to sell.<br />Built to be remembered.</h2></div>
          <p>Premium digital retail is not decoration. It is the discipline of guiding attention: what the eye sees first, where it pauses, what reassures it, and how naturally it reaches the next action.</p>
        </div>

        <div className="fs-about-values">
          {values.map(([number, title, body]) => (
            <article className="fs-about-value" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell fs-about-cta">
        <h2>See the system working in the storefront.</h2>
        <Link className="btn btn-dark" to="/shop">Explore the shop</Link>
      </section>
    </main>
  );
}
