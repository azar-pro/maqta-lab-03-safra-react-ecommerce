import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';

const StoreContext = createContext(null);

function readLocalStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readLocalStorage('safra-cart', []));
  const [wishlist, setWishlist] = useState(() => readLocalStorage('safra-wishlist', []));

  useEffect(() => localStorage.setItem('safra-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('safra-wishlist', JSON.stringify(wishlist)), [wishlist]);

  function addToCart(productId, color = '') {
    setCart(current => {
      const key = `${productId}-${color}`;
      const existing = current.find(item => item.key === key);
      if (existing) {
        return current.map(item => item.key === key ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { key, productId, color, quantity: 1 }];
    });
  }

  function updateQuantity(key, quantity) {
    setCart(current => quantity <= 0
      ? current.filter(item => item.key !== key)
      : current.map(item => item.key === key ? { ...item, quantity } : item));
  }

  function removeFromCart(key) {
    setCart(current => current.filter(item => item.key !== key));
  }

  function toggleWishlist(productId) {
    setWishlist(current => current.includes(productId)
      ? current.filter(id => id !== productId)
      : [...current, productId]);
  }

  function clearCart() {
    setCart([]);
  }

  const detailedCart = useMemo(() => cart.map(item => ({
    ...item,
    product: products.find(product => product.id === item.productId),
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
