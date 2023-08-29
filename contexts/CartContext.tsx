import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { CartItem } from '../@types/products-type';

type CartContextType = {
  countCart: number;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void; 
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const { cart: cartCookie } = parseCookies();
    if (cartCookie) {
      setCart(JSON.parse(cartCookie));
    }
  }, []);

  const addToCart = (item: CartItem) => {
    const newCart = [...cart, item].filter(Boolean);
    setCart(newCart);
    setCookie(undefined, 'cart', JSON.stringify(newCart), { path: '/' });
  };

  const removeFromCart = (itemId: string) => {
    console.log(itemId)
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    setCookie(undefined, 'cart', JSON.stringify(updatedCart), { path: '/' });
  };

  const contextValue: CartContextType = {
    countCart: cart.length,
    cart,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
