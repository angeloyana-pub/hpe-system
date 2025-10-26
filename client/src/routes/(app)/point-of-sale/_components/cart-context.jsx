import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be within an CartProvider');
  return ctx;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const total = useMemo(
    () => cart.reduce((sum, cartItem) => sum + cartItem.part.price * cartItem.quantity, 0),
    [cart]
  );

  const addToCart = (part) => {
    setCart((prev) => [...prev, { id: part.id, part, quantity: 1 }]);
  };

  const getCartItem = (cartItemId) => {
    return cart.find((cartItem) => cartItem.id === cartItemId) ?? null;
  };

  const setQuantity = (cartItemId, quantity) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((cartItem) => cartItem.id !== cartItemId));
    } else {
      setCart((prev) =>
        prev.map((cartItem) => {
          if (cartItem.id !== cartItemId) return cartItem;
          return { ...cartItem, quantity };
        })
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        total,
        addToCart,
        getCartItem,
        setQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
