import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { IProduct } from '../types/ProductType';

type CartContextType = {
  countCart: number;
  cart: IProduct[];
  totalPrice: number;
  setCart: (cart: any) => void;
  addToCart: (item: IProduct, quantity: number) => void;
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
  const [cart, setCart] = useState<IProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const { cart: cartCookie } = parseCookies();
    if (cartCookie) {
      const parsedCart: IProduct[] = JSON.parse(cartCookie);
      setCart(parsedCart);
      calculateTotalPrice(parsedCart);
    }
  }, []);

  const addToCart = (item: IProduct, quantity?: number) => {

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === existingItem.id
          ? { ...cartItem, quantity: quantity ? quantity : cartItem?.quantity + 1 }
          : cartItem
      );

      setCart(updatedCart);
      setCookie(undefined, 'cart', JSON.stringify(updatedCart), { path: '/' });
      calculateTotalPrice(updatedCart);
    } else {
      const newItem: IProduct = { ...item, quantity: 1 };
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
      let updatedCart: IProduct[] = [];

      if (existingItem?.quantity > 1) {
        updatedCart = cart.map(cartItem =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem?.quantity - 1 }
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

  const calculateTotalQuantity = (cartItems: IProduct[]) => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const calculateTotalPrice = (cartItems: IProduct[]) => {
    const total = cartItems.reduce((sum, item) => sum + item.price_net * item.quantity, 0);
    setTotalPrice(total);
  };

  const contextValue: CartContextType = {
    countCart: calculateTotalQuantity(cart),
    totalPrice,
    cart,
    setCart,
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
