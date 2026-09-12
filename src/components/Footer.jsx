import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flagship-footer">
      <section className="fs-service-strip" aria-label="SAFRA service promises">
        <div className="shell fs-service-grid">
          <div className="fs-service-item">
            <span>01 / Delivery</span>
            <strong>Complimentary shipping</strong>
            <small>On orders over 900 DH</small>
          </div>
          <div className="fs-service-item">
            <span>02 / Returns</span>
            <strong>30-day returns</strong>
            <small>Time to decide at home</small>
          </div>
          <div className="fs-service-item">
            <span>03 / Checkout</span>
            <strong>Protected demo flow</strong>
            <small>No real charge is collected</small>
          </div>
          <div className="fs-service-item">
            <span>04 / Presentation</span>
            <strong>Considered packaging</strong>
            <small>Paper-first, quietly detailed</small>
          </div>
        </div>
      </section>

      <div className="shell fs-footer-newsletter">
        <div>
          <p className="eyebrow">The SAFRA Journal</p>
          <h2>New objects, private notes and the next drop.</h2>
        </div>
        <form className="fs-footer-form" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" type="email" placeholder="Your email address" autoComplete="email" />
          <button type="submit">Join →</button>
        </form>
      </div>

      <div className="shell fs-footer-main">
        <div className="fs-footer-wordmark" aria-hidden="true">SAFRA</div>

        <div className="fs-footer-grid">
          <div className="fs-footer-brandline">
            <strong>SAFRA</strong>
            <p>Contemporary accessories shaped around movement, tactile material and a precise use of color. A retail concept with roots in Fès.</p>
          </div>
          <div>
            <strong>Shop</strong>
            <Link to="/shop">All pieces</Link>
            <Link to="/shop?category=Bags">Bags</Link>
            <Link to="/shop?category=Jewelry">Jewelry</Link>
            <Link to="/shop?category=Eyewear">Eyewear</Link>
          </div>
          <div>
            <strong>Explore</strong>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/about">Our point of view</Link>
            <Link to="/cart">Your bag</Link>
          </div>
          <div>
            <strong>Edition</strong>
            <span>Fès · Morocco</span>
            <span>Drop 01 / 2026</span>
            <span>Online concept store</span>
          </div>
        </div>

        <div className="fs-footer-bottom">
          <span>© {new Date().getFullYear()} SAFRA · Portfolio commerce concept</span>
          <span>Created by <a href="https://maqtastudio.com" target="_blank" rel="noreferrer">MAQTA STUDIO</a></span>
        </div>
      </div>
    </footer>
  );
}
