import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import About from './pages/About';
import { products } from './data/products';

const defaultMeta = {
  title: 'SAFRA — Contemporary Accessories from Fès',
  description: 'SAFRA is a contemporary accessories concept from Fès, Morocco: bags, jewelry, eyewear and small leather goods shaped around movement, material and color.',
};

function resolveMeta(pathname) {
  if (pathname === '/shop') return {
    title: 'The Edit — SAFRA',
    description: 'Explore SAFRA Drop 01: a tightly edited collection of contemporary bags, jewelry, eyewear and small leather goods.',
  };
  if (pathname === '/about') return {
    title: 'About SAFRA — Form, Material, Movement',
    description: 'Discover SAFRA’s point of view: contemporary accessories informed by Fès, tactile materials, controlled color and everyday movement.',
  };
  if (pathname === '/wishlist') return { title: 'Saved Pieces — SAFRA', description: 'Revisit the SAFRA pieces saved to your private local edit.' };
  if (pathname === '/cart') return { title: 'Your Bag — SAFRA', description: 'Review selected SAFRA pieces, colors, quantities and delivery before checkout.' };
  if (pathname === '/checkout') return { title: 'Checkout — SAFRA', description: 'SAFRA portfolio checkout experience with accessible form validation and local commerce state.' };
  if (pathname.startsWith('/product/')) {
    const id = decodeURIComponent(pathname.split('/product/')[1] || '');
    const product = products.find(item => item.id === id);
    if (product) return {
      title: `${product.name} — SAFRA`,
      description: `${product.description} ${product.material}. Available in ${product.colors.join(', ')}.`,
    };
  }
  return defaultMeta;
}

function SiteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = resolveMeta(pathname);
    document.title = meta.title;

    const setMeta = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
  }, [pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <main className="fs-cart-empty">
      <div className="shell fs-wishlist-empty-copy" style={{ marginInline: 'auto', maxWidth: 780, textAlign: 'center', alignItems: 'center' }}>
        <p className="eyebrow">404 / Not found</p>
        <h2>Wrong turn.<br />Good taste.</h2>
        <p>The page may have moved, but the collection is still exactly where it should be.</p>
        <Link className="btn btn-dark" to="/">Back home</Link>
      </div>
    </main>
  );
}

export default function App() {
  const location = useLocation();
  const meta = resolveMeta(location.pathname);

  return (
    <>
      <a className="fs-skip-link" href="#main-content">Skip to content</a>
      <SiteMeta />
      <ScrollToTop />
      <Header />
      <div id="main-content" className="fs-route-stage" key={location.pathname} tabIndex="-1">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{meta.title}</p>
      <Footer />
    </>
  );
}
