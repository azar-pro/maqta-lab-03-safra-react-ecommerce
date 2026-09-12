import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlist } = useStore();
  const location = useLocation();
  const logoPath = `${import.meta.env.BASE_URL}safra-mark.svg`;

  const close = () => setOpen(false);

  useEffect(() => {
    close();
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className={`flagship-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="flagship-announcement" aria-label="Store announcement">
        <span>Fès / Morocco</span>
        <span>Complimentary delivery over 900 DH</span>
        <span>Drop 01 / 2026</span>
      </div>

      <div className="shell flagship-nav">
        <button
          className={`flagship-menu-button ${open ? 'open' : ''}`}
          type="button"
          aria-expanded={open}
          aria-controls="flagship-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(value => !value)}
        >
          <div aria-hidden="true"><span></span><span></span></div>
        </button>

        <nav id="flagship-navigation" className={`flagship-navlinks ${open ? 'open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" onClick={close}>Home</NavLink>
          <NavLink to="/shop" onClick={close}>Shop</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/wishlist" onClick={close}>Wishlist <span className="flagship-count">{wishlist.length}</span></NavLink>
          <div className="flagship-mobile-nav-note" aria-hidden="true">
            <span>SAFRA / FÈS</span>
            <span>DROP 01 · 2026</span>
          </div>
        </nav>

        <Link className="flagship-brand" to="/" onClick={close} aria-label="SAFRA home">
          <img src={logoPath} alt="" aria-hidden="true" />
          <span className="flagship-brand-word">
            <strong>SAFRA</strong>
            <small>Objects for movement</small>
          </span>
        </Link>

        <div className="flagship-utilities">
          <Link className="fs-wishlist-link" to="/wishlist">Saved {wishlist.length}</Link>
          <Link className="fs-bag" to="/cart" aria-label={`Bag with ${cartCount} items`}>Bag <span className="flagship-count">{cartCount}</span></Link>
        </div>
      </div>
    </header>
  );
}
