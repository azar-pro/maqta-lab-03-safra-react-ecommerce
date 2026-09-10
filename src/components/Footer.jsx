import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flagship-footer">
      <div className="shell fs-footer-newsletter">
        <div>
          <p className="eyebrow">Private notes / new drops</p>
          <h2>Join the SAFRA list.</h2>
        </div>
        <form className="fs-footer-form" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" type="email" placeholder="Email address" autoComplete="email" />
          <button type="submit">Join →</button>
        </form>
      </div>

      <div className="shell fs-footer-main">
        <div className="fs-footer-wordmark" aria-hidden="true">SAFRA</div>

        <div className="fs-footer-grid">
          <div className="fs-footer-brandline">
            <strong>About</strong>
            <p>Contemporary accessories shaped around movement, utility and a precise graphic point of view. A fictional retail concept from Fès, Morocco.</p>
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
            <Link to="/about">About SAFRA</Link>
            <Link to="/cart">Your bag</Link>
          </div>
          <div>
            <strong>Studio</strong>
            <span>Fès · Morocco</span>
            <a href="mailto:hello@safra.example">hello@safra.example</a>
            <span>Mon–Sat / 10–18</span>
          </div>
        </div>

        <div className="fs-footer-bottom">
          <span>© {new Date().getFullYear()} SAFRA · Fictional portfolio concept</span>
          <span>Created by <a href="https://maqtastudio.com" target="_blank" rel="noreferrer">MAQTA STUDIO</a></span>
        </div>
      </div>
    </footer>
  );
}
