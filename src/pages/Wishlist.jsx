import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function Wishlist() {
  const { wishlist } = useStore();
  const saved = products.filter(product => wishlist.includes(product.id));

  return (
    <main className="section wishlist-page">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">Saved pieces</p>
          <h1>Wishlist</h1>
        </div>

        {saved.length ? (
          <div className="product-grid product-grid-shop">
            {saved.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="empty-state">
            <strong>Nothing saved yet.</strong>
            <p>Tap the heart on any product to keep it here.</p>
            <Link className="btn btn-dark" to="/shop">Browse the shop</Link>
          </div>
        )}
      </div>
    </main>
  );
}
