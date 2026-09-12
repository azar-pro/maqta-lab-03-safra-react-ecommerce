import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
    <main className="fs-shop fs-shop-v2">
      <section className="fs-shop-masthead fs-shop-masthead-v2" aria-labelledby="shop-title">
        <div className="shell fs-shop-masthead-inner">
          <div className="fs-shop-kicker-row">
            <p className="eyebrow">SAFRA / DROP 01 / FÈS</p>
            <span>08 OBJECTS · 04 CATEGORIES</span>
          </div>
          <h1 id="shop-title">THE EDIT</h1>
          <div className="fs-shop-masthead-bottom">
            <p>Modern accessories for a lighter tomorrow. A precise collection of bags, jewelry and eyewear shaped around movement, proportion and color.</p>
            <Link className="fs-shop-story-link" to="/about">Read our point of view ↗</Link>
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
          <div className="fs-results-line fs-results-line-v2" aria-live="polite">
            <span>Showing {filtered.length} of {products.length} pieces</span>
            <span>{category}{query ? ` / “${query}”` : ''}</span>
          </div>

          {filtered.length ? (
            <div className="product-grid fs-shop-grid fs-shop-grid-v2">
              {filtered.map((product, index) => (
                <Fragment key={product.id}>
                  <ProductCard product={product} />
                  {index === 3 && filtered.length > 4 && (
                    <article className="fs-shop-editorial-card">
                      <div className="fs-shop-editorial-media" aria-hidden="true"></div>
                      <div className="fs-shop-editorial-copy">
                        <span>STUDIO NOTE / 01</span>
                        <h2>Carry good things forward.</h2>
                        <p>Useful objects with a graphic point of view — made to move easily between work, travel and everyday life.</p>
                        <Link to="/about">Discover SAFRA ↗</Link>
                      </div>
                    </article>
                  )}
                </Fragment>
              ))}
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
