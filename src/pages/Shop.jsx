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
    <main className="fs-shop">
      <section className="fs-shop-masthead" aria-labelledby="shop-title">
        <div className="shell fs-shop-masthead-inner">
          <p className="eyebrow" style={{ color: 'rgba(255,255,255,.62)' }}>Drop 01 / 2026</p>
          <h1 id="shop-title">SHOP</h1>
          <div className="fs-shop-masthead-bottom">
            <p>Eight objects. Four categories. A tightly edited collection built around proportion, utility and unmistakable color.</p>
            <span>FÈS / MOROCCO · 08 PIECES</span>
          </div>
        </div>
      </section>

      <div className="fs-shop-controls-wrap">
        <div className="shell fs-shop-controls">
          <div className="fs-category-tabs" aria-label="Product categories">
            {categories.map(item => (
              <button
                key={item}
                type="button"
                className={category === item ? 'active' : ''}
                aria-pressed={category === item}
                onClick={() => chooseCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="fs-shop-tools">
            <label className="fs-search">
              <span className="sr-only">Search products</span>
              <input type="search" placeholder="Search name or material" value={query} onChange={event => setQuery(event.target.value)} />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
            </label>
            <label className="fs-sort">
              <span className="sr-only">Sort products</span>
              <select value={sort} onChange={event => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price · Low to high</option>
                <option value="price-high">Price · High to low</option>
                <option value="name">Name · A–Z</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <section className="fs-shop-body">
        <div className="shell">
          <div className="fs-results-line" aria-live="polite">
            <span>{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</span>
            <span>{category}{query ? ` / “${query}”` : ''}</span>
          </div>

          {filtered.length ? (
            <div className="product-grid fs-shop-grid">
              {filtered.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="fs-shop-empty">
              <div>
                <p className="eyebrow">No result</p>
                <strong>Nothing matches.</strong>
                <p>Try another phrase or return to the complete collection.</p>
                <button className="btn btn-dark" type="button" onClick={resetFilters}>Reset filters</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
