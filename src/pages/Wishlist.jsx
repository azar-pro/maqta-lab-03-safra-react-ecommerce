import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function Wishlist() {
  const { wishlist } = useStore();
  const saved = products.filter(product => wishlist.includes(product.id));

  return (
    <main>
      <section className="fs-wishlist-hero">
        <div className="shell fs-wishlist-head">
          <div>
            <span className="fs-wishlist-count">{saved.length.toString().padStart(2, '0')} saved {saved.length === 1 ? 'piece' : 'pieces'}</span>
            <h1 className="fs-page-title">Wishlist</h1>
          </div>
          <aside>Keep a private edit of the pieces you want to revisit. Your selection is stored locally on this device.</aside>
        </div>
      </section>

      <section className="fs-wishlist-body">
        <div className="shell">
          {saved.length ? (
            <div className="product-grid fs-wishlist-grid">
              {saved.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="fs-wishlist-empty">
              <div className="fs-wishlist-empty-media" aria-hidden="true"></div>
              <div className="fs-wishlist-empty-copy">
                <p className="eyebrow">Your edit is empty</p>
                <h2>Save what stays with you.</h2>
                <p>Use the heart on any piece to create a compact shortlist, then return here whenever you want to compare.</p>
                <Link className="btn btn-dark" to="/shop">Explore the collection</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
