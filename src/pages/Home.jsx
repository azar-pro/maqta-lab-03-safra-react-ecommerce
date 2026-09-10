import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <main>
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">New collection · 2026</p>
            <h1>Objects for<br /><em>everyday movement.</em></h1>
            <p className="hero-lead">A sharp edit of bags, jewelry and eyewear designed around clean forms, useful details and a little color.</p>
            <div className="hero-actions">
              <Link className="btn btn-dark" to="/shop">Shop the collection</Link>
              <Link className="text-link" to="/about">Discover SAFRA ↗</Link>
            </div>
          </div>

          <div className="hero-editorial" aria-label="SAFRA campaign accessories">
            <div className="hero-image hero-image-main"></div>
            <div className="hero-color-card">
              <span>DROP 01</span>
              <strong>FORM / COLOR / USE</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Store highlights">
        <div>FÈS / MOROCCO</div><div>FREE DELIVERY OVER 900 DH</div><div>NEW DROP ONLINE</div><div>30-DAY RETURNS</div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured now</p>
              <h2>Small things.<br />Strong point of view.</h2>
            </div>
            <Link className="text-link" to="/shop">Shop all products ↗</Link>
          </div>
          <div className="product-grid">
            {featured.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="category-editorial">
        <div className="shell category-grid">
          <Link to="/shop?category=Bags" className="category-tile category-bags">
            <span>01</span><strong>Bags</strong><small>Structured, compact, useful.</small>
          </Link>
          <Link to="/shop?category=Jewelry" className="category-tile category-jewelry">
            <span>02</span><strong>Jewelry</strong><small>Clean metal, easy layering.</small>
          </Link>
          <Link to="/shop?category=Eyewear" className="category-tile category-eyewear">
            <span>03</span><strong>Eyewear</strong><small>Graphic frames for bright days.</small>
          </Link>
        </div>
      </section>

      <section className="section story-strip">
        <div className="shell story-grid">
          <p className="eyebrow">The idea</p>
          <h2>Designed to feel considered, never precious.</h2>
          <p>SAFRA is a fictional retail concept exploring how a modern fashion boutique can feel editorial and expressive without sacrificing usability. The interface keeps shopping actions obvious while letting the products lead visually.</p>
          <Link className="btn btn-light" to="/about">Read the story</Link>
        </div>
      </section>
    </main>
  );
}
