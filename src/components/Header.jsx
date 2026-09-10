import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  const logoPath = `${import.meta.env.BASE_URL}safra-mark.svg`;

  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 820) setOpen(false);
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
    <header className="site-header premium-header">
      <div className="announcement-bar" aria-label="Store announcement">
        <span>Fès / Morocco</span>
        <span>Complimentary delivery over 900 DH</span>
        <span>Drop 01 / 2026</span>
      </div>

      <div className="shell header-row premium-header-row">
        <button
          className={`menu-button ${open ? 'open' : ''}`}
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(v => !v)}
        >
          <span></span><span></span>
        </button>

        <Link className="brand-lockup premium-brand" to="/" onClick={close} aria-label="SAFRA home">
          <img className="brand-mark" src={logoPath} alt="" aria-hidden="true" />
          <span className="brand-copy">
            <strong>SAFRA</strong>
            <small>Objects for movement</small>
          </span>
        </Link>

        <nav id="main-nav" className={`main-nav ${open ? 'open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" onClick={close}>Home</NavLink>
          <NavLink to="/shop" onClick={close}>Shop</NavLink>
          <NavLink to="/wishlist" onClick={close}>Wishlist <span className="nav-count">{wishlist.length}</span></NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
        </nav>

        <div className="header-actions premium-header-actions">
          <Link to="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`}>Wishlist <span>{wishlist.length}</span></Link>
          <Link className="bag-link" to="/cart" aria-label={`Cart with ${cartCount} items`}>Bag <span>{cartCount}</span></Link>
        </div>
      </div>
    </header>
  );
}
