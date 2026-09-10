import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : 'All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let result = products.filter(product => {
      const categoryMatch = category === 'All' || product.category === category;
      const queryMatch = `${product.name} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase());
      return categoryMatch && queryMatch;
    });

    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [category, query, sort]);

  function chooseCategory(next) {
    setCategory(next);
    if (next === 'All') setSearchParams({});
    else setSearchParams({ category: next });
  }

  return (
    <main>
      <section className="shop-hero">
        <div className="shell">
          <p className="eyebrow">Shop all</p>
          <h1>Useful objects.<br />Distinct character.</h1>
          <p>Explore the full SAFRA edit, then narrow it by category, search or price.</p>
        </div>
      </section>

      <section className="section shop-section">
        <div className="shell">
          <div className="shop-toolbar">
            <div className="category-pills" aria-label="Product categories">
              {categories.map(item => (
                <button key={item} className={category === item ? 'active' : ''} onClick={() => chooseCategory(item)}>{item}</button>
              ))}
            </div>
            <div className="shop-controls">
              <label>
                <span className="sr-only">Search products</span>
                <input type="search" placeholder="Search products" value={query} onChange={e => setQuery(e.target.value)} />
              </label>
              <label>
                <span className="sr-only">Sort products</span>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="name">Name A–Z</option>
                </select>
              </label>
            </div>
          </div>

          <div className="results-line"><span>{filtered.length} products</span><span>{category}</span></div>

          {filtered.length ? (
            <div className="product-grid product-grid-shop">
              {filtered.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="empty-state">
              <strong>No products found.</strong>
              <p>Try another search or reset the category filter.</p>
              <button className="btn btn-dark" onClick={() => { setQuery(''); chooseCategory('All'); }}>Reset filters</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
