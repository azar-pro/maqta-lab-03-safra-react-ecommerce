import { Link } from 'react-router-dom';

export default function Footer() {
  const logoPath = `${import.meta.env.BASE_URL}safra-mark.svg`;

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="footer-brand-lockup" to="/" aria-label="SAFRA home">
            <img className="brand-mark" src={logoPath} alt="" aria-hidden="true" />
            <span className="brand-copy">
              <strong>SAFRA</strong>
              <small>Objects for movement</small>
            </span>
          </Link>
          <p>Contemporary accessories for everyday movement. Fictional e-commerce concept built for portfolio practice.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <Link to="/shop">Shop all</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          <strong>Studio</strong>
          <span>Fès · Morocco</span>
          <a href="mailto:hello@safra.example">hello@safra.example</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} SAFRA. Fictional portfolio concept.</span>
        <span>Created by <a href="https://maqtastudio.com" target="_blank" rel="noreferrer">MAQTA STUDIO</a></span>
      </div>
    </footer>
  );
}
