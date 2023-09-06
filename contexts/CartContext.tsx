import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { CartItem } from '../@types/products-type';

type CartContextType = {
  countCart: number;
  cart: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  removeFromCartOneProduct: (itemId: string) => void;
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
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const { cart: cartCookie } = parseCookies();
    if (cartCookie) {
      const parsedCart: CartItem[] = JSON.parse(cartCookie);
      setCart(parsedCart);
      calculateTotalPrice(parsedCart);
    }
  }, []);

  const addToCart = (item: CartItem) => {

    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === existingItem.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      setCart(updatedCart);
      setCookie(undefined, 'cart', JSON.stringify(updatedCart), { path: '/' });
      calculateTotalPrice(updatedCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };
      const newCart = [...cart, newItem];
      setCart(newCart);
      setCookie(undefined, 'cart', JSON.stringify(newCart), { path: '/' });
      calculateTotalPrice(newCart);
    }
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter(item => item.id !== itemId);

    setCart(updatedCart);
    setCookie(undefined, 'cart', JSON.stringify(updatedCart), { path: '/' });

    calculateTotalPrice(updatedCart)
  };

  const removeFromCartOneProduct = (itemId: string) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
      let updatedCart: CartItem[] = [];

      if (existingItem.quantity > 1) {
        updatedCart = cart.map(cartItem =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        updatedCart = cart.filter(item => item.id !== itemId);
      }

      setCart(updatedCart);
      setCookie(undefined, 'cart', JSON.stringify(updatedCart), { path: '/' });
      calculateTotalPrice(updatedCart);
    }
  };

  const calculateTotalQuantity = (cartItems: CartItem[]) => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const calculateTotalPrice = (cartItems: CartItem[]) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const contextValue: CartContextType = {
    countCart: calculateTotalQuantity(cart),
    totalPrice,
    cart,
    addToCart,
    removeFromCart,
    removeFromCartOneProduct,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
