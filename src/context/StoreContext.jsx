import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';

const StoreContext = createContext(null);
const productsById = new Map(products.map(product => [product.id, product]));

function readLocalStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeColor(product, color) {
  if (!product?.colors?.length) return '';
  return product.colors.includes(color) ? color : product.colors[0];
}

function normalizeCart(value) {
  if (!Array.isArray(value)) return [];

  const merged = new Map();

  value.forEach(item => {
    const product = productsById.get(item?.productId);
    if (!product) return;

    const color = normalizeColor(product, item.color);
    const quantity = Math.max(1, Math.min(10, Number(item.quantity) || 1));
    const key = `${product.id}-${color}`;
    const existing = merged.get(key);

    merged.set(key, {
      key,
      productId: product.id,
      color,
      quantity: Math.min(10, (existing?.quantity || 0) + quantity),
    });
  });

  return [...merged.values()];
}

function normalizeWishlist(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter(id => productsById.has(id)))];
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => normalizeCart(readLocalStorage('safra-cart', [])));
  const [wishlist, setWishlist] = useState(() => normalizeWishlist(readLocalStorage('safra-wishlist', [])));

  useEffect(() => localStorage.setItem('safra-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('safra-wishlist', JSON.stringify(wishlist)), [wishlist]);

  function addToCart(productId, color = '', quantity = 1) {
    const product = productsById.get(productId);
    if (!product) return;

    const safeColor = normalizeColor(product, color);
    const safeQuantity = Math.max(1, Math.min(10, Number(quantity) || 1));

    setCart(current => {
      const key = `${productId}-${safeColor}`;
      const existing = current.find(item => item.key === key);

      if (existing) {
        return current.map(item => item.key === key
          ? { ...item, quantity: Math.min(10, item.quantity + safeQuantity) }
          : item);
      }

      return [...current, { key, productId, color: safeColor, quantity: safeQuantity }];
    });
  }

  function updateQuantity(key, quantity) {
    const nextQuantity = Number(quantity) || 0;
    setCart(current => nextQuantity <= 0
      ? current.filter(item => item.key !== key)
      : current.map(item => item.key === key ? { ...item, quantity: Math.min(10, nextQuantity) } : item));
  }

  function removeFromCart(key) {
    setCart(current => current.filter(item => item.key !== key));
  }

  function toggleWishlist(productId) {
    if (!productsById.has(productId)) return;
    setWishlist(current => current.includes(productId)
      ? current.filter(id => id !== productId)
      : [...current, productId]);
  }

  function clearCart() {
    setCart([]);
  }

  const detailedCart = useMemo(() => cart.map(item => ({
    ...item,
    product: productsById.get(item.productId),
  })).filter(item => item.product), [cart]);

  const cartCount = detailedCart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = detailedCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      cart,
      detailedCart,
      cartCount,
      subtotal,
      wishlist,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
      clearCart,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside StoreProvider');
  return value;
}
