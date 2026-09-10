import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <main className="premium-home">
      <section className="luxury-hero" aria-labelledby="home-title">
        <div className="luxury-hero-media" aria-hidden="true"></div>
        <div className="luxury-hero-shade" aria-hidden="true"></div>
        <div className="shell luxury-hero-content">
          <div className="luxury-hero-copy">
            <p className="luxury-kicker">SAFRA / DROP 01 / FÈS</p>
            <h1 id="home-title">Quiet form.<br /><em>Bold movement.</em></h1>
            <p>A considered edit of bags, jewelry and eyewear for daily life — clean silhouettes, tactile materials and precise color.</p>
            <div className="luxury-hero-actions">
              <Link className="luxury-primary" to="/shop">Shop Drop 01</Link>
              <Link className="luxury-secondary" to="/about">Our point of view</Link>
            </div>
          </div>

          <aside className="luxury-hero-card" aria-label="Collection note">
            <span>01</span>
            <div>
              <small>Collection note</small>
              <strong>Useful objects, edited like fashion.</strong>
            </div>
          </aside>
        </div>
        <div className="luxury-hero-bottom shell" aria-hidden="true">
          <span>CONTEMPORARY ACCESSORIES</span>
          <span>SCROLL TO DISCOVER ↓</span>
        </div>
      </section>

      <section className="luxury-intro section">
        <div className="shell luxury-intro-grid">
          <p className="eyebrow">The SAFRA edit</p>
          <h2>Designed to be noticed.<br /><em>Built to be used.</em></h2>
          <div className="luxury-intro-note">
            <p>SAFRA balances expressive styling with an effortless shopping experience. The collection is small on purpose: every piece earns its place.</p>
            <Link className="text-link" to="/shop">Explore the full collection ↗</Link>
          </div>
        </div>
      </section>

      <section className="section premium-featured-section">
        <div className="shell">
          <div className="premium-section-heading">
            <div>
              <p className="eyebrow">Selected pieces</p>
              <h2>The first edit.</h2>
            </div>
            <span>04 / 08</span>
          </div>
          <div className="product-grid premium-home-grid">
            {featured.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="luxury-editorial-band">
        <div className="luxury-editorial-image" aria-hidden="true"></div>
        <div className="luxury-editorial-copy">
          <p className="eyebrow">Material / proportion / color</p>
          <h2>Less noise.<br />More character.</h2>
          <p>We focus on pieces that feel immediate from a distance and considered up close. Strong shape, clear purpose, no unnecessary decoration.</p>
          <Link className="luxury-primary luxury-primary-light" to="/about">Discover SAFRA</Link>
        </div>
      </section>

      <section className="section premium-category-section">
        <div className="shell">
          <div className="premium-section-heading premium-category-heading">
            <div>
              <p className="eyebrow">Shop by category</p>
              <h2>Choose your object.</h2>
            </div>
          </div>
          <div className="premium-category-grid">
            <Link to="/shop?category=Bags" className="premium-category-card premium-category-bags">
              <span className="premium-category-index">01</span>
              <div><small>Carry</small><strong>Bags</strong><span>Structured essentials for every day.</span></div>
            </Link>
            <Link to="/shop?category=Jewelry" className="premium-category-card premium-category-jewelry">
              <span className="premium-category-index">02</span>
              <div><small>Layer</small><strong>Jewelry</strong><span>Clean metal, quiet shine.</span></div>
            </Link>
            <Link to="/shop?category=Eyewear" className="premium-category-card premium-category-eyewear">
              <span className="premium-category-index">03</span>
              <div><small>Frame</small><strong>Eyewear</strong><span>Graphic silhouettes for bright days.</span></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="premium-marquee" aria-label="SAFRA brand values">
        <div>
          <span>FORM</span><i>◆</i><span>COLOR</span><i>◆</i><span>USE</span><i>◆</i><span>FÈS</span><i>◆</i><span>SAFRA</span>
        </div>
      </section>

      <section className="section premium-final-cta">
        <div className="shell premium-final-cta-inner">
          <p className="eyebrow">Drop 01 / 2026</p>
          <h2>Find the piece<br />that moves with you.</h2>
          <Link className="luxury-primary" to="/shop">Shop all products</Link>
        </div>
      </section>
    </main>
  );
}
