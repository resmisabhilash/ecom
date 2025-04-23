// context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { user } = useContext(AuthContext);  // Assuming AuthContext is where the user is stored

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          const res = await axios.get('http://localhost:6009/api/cart', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setCartItemsCount(res.data.totalItems); // Set the total items in the cart
        } catch (err) {
          console.error('Failed to fetch cart', err);
        }
      };
      fetchCart();
    }
  }, [user]); // Trigger when the user changes

  return (
    <CartContext.Provider value={{ cartItemsCount, setCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};
