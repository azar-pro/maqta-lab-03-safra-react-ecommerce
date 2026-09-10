import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist } = useStore();

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="shell header-row">
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(v => !v)}>
          <span></span><span></span>
          <span className="sr-only">Toggle navigation</span>
        </button>

        <Link className="wordmark" to="/" onClick={close} aria-label="SAFRA home">SAFRA</Link>

        <nav id="main-nav" className={`main-nav ${open ? 'open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" onClick={close}>Home</NavLink>
          <NavLink to="/shop" onClick={close}>Shop</NavLink>
          <NavLink to="/wishlist" onClick={close}>Wishlist <span className="nav-count">{wishlist.length}</span></NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`}>♡ <span>{wishlist.length}</span></Link>
          <Link to="/cart" aria-label={`Cart with ${cartCount} items`}>Bag <span>{cartCount}</span></Link>
        </div>
      </div>
    </header>
  );
}
