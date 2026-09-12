import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <main className="fs-home">
      <section className="fs-hero" aria-labelledby="home-title">
        <div className="fs-hero-media" aria-hidden="true"></div>
        <div className="shell fs-hero-inner">
          <div className="fs-hero-copy">
            <p className="fs-hero-kicker">SAFRA / DROP 01 / FÈS</p>
            <h1 id="home-title">Modern accessories<br /><em>for a lighter tomorrow.</em></h1>
            <p className="fs-hero-lead">Timeless pieces, meaningful choices. A tightly edited collection of bags, jewelry and eyewear built around proportion, material and real everyday movement.</p>
            <div className="fs-hero-actions">
              <Link className="fs-hero-cta primary" to="/shop">Shop new arrivals</Link>
              <Link className="fs-hero-cta" to="/about">Discover SAFRA</Link>
            </div>
          </div>

          <aside className="fs-hero-note" aria-label="Collection note">
            <span>01</span>
            <small>Collection note</small>
            <strong>Designed for real life. Refined enough to keep.</strong>
          </aside>
        </div>

        <div className="fs-hero-caption" aria-hidden="true">
          <span>CONTEMPORARY ACCESSORIES / 2026</span>
          <span>FÈS · MOROCCO</span>
        </div>
      </section>

      <section className="shell fs-intro">
        <p className="eyebrow">The SAFRA edit</p>
        <h2>Timeless form.<br /><em>Considered choices.</em></h2>
        <div className="fs-intro-copy">
          <p>SAFRA is intentionally compact. Every object is selected for clarity of shape, ease of use and the way it changes an everyday silhouette without asking for attention.</p>
          <Link className="text-link" to="/shop">Explore all pieces ↗</Link>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="fs-section-head">
            <div>
              <p className="eyebrow">New arrivals</p>
              <h2 className="fs-section-title">The first edit.</h2>
            </div>
            <span className="fs-section-counter">04 selected / 08 total</span>
          </div>
          <div className="product-grid">
            {featured.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="fs-editorial">
        <div className="fs-editorial-image" aria-hidden="true"></div>
        <div className="fs-editorial-copy">
          <p className="eyebrow">Material / proportion / color</p>
          <h2>Less noise.<br />More character.</h2>
          <p>Strong materials, clean construction and generous negative space. The collection is designed to feel deliberate rather than crowded by trend.</p>
          <Link className="btn btn-light" to="/about">Our point of view</Link>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="fs-section-head">
            <div>
              <p className="eyebrow">Shop by category</p>
              <h2 className="fs-section-title">Choose your object.</h2>
            </div>
          </div>

          <div className="fs-category-grid">
            <Link className="fs-category-card fs-cat-bags" to="/shop?category=Bags">
              <span>01 / CARRY</span>
              <div><small>Structured essentials</small><strong>Bags</strong><p>Compact shapes, clean hardware and enough room for what matters.</p></div>
            </Link>
            <Link className="fs-category-card fs-cat-jewelry" to="/shop?category=Jewelry">
              <span>02 / LAYER</span>
              <div><small>Quiet shine</small><strong>Jewelry</strong><p>Graphic metal pieces that work alone or layered.</p></div>
            </Link>
            <Link className="fs-category-card fs-cat-eyewear" to="/shop?category=Eyewear">
              <span>03 / FRAME</span>
              <div><small>Bright-day structure</small><strong>Eyewear</strong><p>Defined silhouettes with an architectural edge.</p></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="fs-manifesto">
        <div className="shell fs-manifesto-grid">
          <p className="eyebrow">A more conscious way forward</p>
          <h2>Carry good things<br /><em>forward.</em></h2>
          <div className="fs-manifesto-copy">
            <p>Fewer pieces, clearer purpose. SAFRA favors considered materials, useful proportions and packaging designed to feel special without becoming wasteful.</p>
            <Link className="text-link" to="/about">Read our values ↗</Link>
          </div>
        </div>
      </section>

      <section className="fs-marquee" aria-label="SAFRA brand values">
        <div><span>FORM</span><i>◆</i><span>MATERIAL</span><i>◆</i><span>USE</span><i>◆</i><span>FÈS</span><i>◆</i><span>SAFRA</span><i>◆</i><span>DROP 01</span></div>
      </section>

      <section className="fs-final-cta">
        <div className="shell">
          <p className="eyebrow">Drop 01 / 2026</p>
          <h2>Find the piece that moves with you.</h2>
          <Link className="btn btn-dark" to="/shop">Shop all products</Link>
        </div>
      </section>
    </main>
  );
}
