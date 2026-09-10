import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : 'All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const next = searchParams.get('category') || 'All';
    setCategory(categories.includes(next) ? next : 'All');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = products.filter(product => {
      const categoryMatch = category === 'All' || product.category === category;
      const queryMatch = `${product.name} ${product.category} ${product.material}`.toLowerCase().includes(query.trim().toLowerCase());
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

  function resetFilters() {
    setQuery('');
    setSort('featured');
    chooseCategory('All');
  }

  return (
    <main>
      <section className="shop-hero">
        <div className="shell shop-hero-grid">
          <div>
            <p className="eyebrow">Shop all</p>
            <h1>Useful objects.<br />Distinct character.</h1>
          </div>
          <div className="shop-hero-note">
            <span>DROP 01 / 08 PIECES</span>
            <p>Explore the full SAFRA edit, then narrow it by category, material, search or price.</p>
          </div>
        </div>
      </section>

      <section className="section shop-section">
        <div className="shell">
          <div className="shop-toolbar" aria-label="Shop filters">
            <div className="category-pills" aria-label="Product categories">
              {categories.map(item => (
                <button
                  key={item}
                  className={category === item ? 'active' : ''}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => chooseCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="shop-controls">
              <label className="search-control">
                <span className="sr-only">Search products</span>
                <span className="search-icon" aria-hidden="true">⌕</span>
                <input type="search" placeholder="Search name or material" value={query} onChange={e => setQuery(e.target.value)} />
                {query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
              </label>
              <label>
                <span className="sr-only">Sort products</span>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="featured">Sort · Featured</option>
                  <option value="price-low">Price · Low to high</option>
                  <option value="price-high">Price · High to low</option>
                  <option value="name">Name · A–Z</option>
                </select>
              </label>
            </div>
          </div>

          <div className="results-line" aria-live="polite">
            <span>{filtered.length} {filtered.length === 1 ? 'product' : 'products'}</span>
            <span>{category}{query ? ` · “${query}”` : ''}</span>
          </div>

          {filtered.length ? (
            <div className="product-grid product-grid-shop">
              {filtered.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="empty-state empty-state-card">
              <span className="empty-icon" aria-hidden="true">⌕</span>
              <strong>No products found.</strong>
              <p>Try another search term or reset the filters to see the full collection.</p>
              <button className="btn btn-dark" type="button" onClick={resetFilters}>Reset filters</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
