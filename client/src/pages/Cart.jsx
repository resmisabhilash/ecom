// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext"; // Assuming cart logic might be in context
// import axios from "axios";

// function Cart() {
//   const { user } = useContext(AuthContext);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (user) {
//         try {
//           const res = await axios.get('http://localhost:6009/api/cart', {
//             headers: { Authorization: `Bearer ${user.token}` },
//           });
          
//           // Log the response data to ensure we're getting the cart correctly
//           console.log('Cart response:', res.data);

//           setCart(res.data.cartItems || []);  // Ensure cartItems is an array
//         } catch (err) {
//           console.error('Error fetching cart items:', err);
//           setCart([]);  // In case of an error, set cart as empty
//         }
//       }
//     };

//     fetchCart();
//   }, [user]);

//   // Calculate total price of the cart
//   const totalPrice = (cart || []).reduce(
//     (total, item) => total + item.product.price * item.quantity,
//     0
//   );

//   return (
//     <div className="cart text-center">
//       <h3>Your Cart</h3>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <ul className="list-unstyled">
//             {cart.map((item, index) => (
//               <li key={index}>
//                 <div>
//                   <strong>{item.product.name}</strong> - ₹{item.product.price} x{" "}
//                   {item.quantity} = ₹{(item.product.price * item.quantity).toFixed(2)}
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <hr />
//           <div className="total">
//             <strong>Total: ₹{totalPrice.toFixed(2)}</strong>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;


import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Cart() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const res = await axios.get('http://localhost:6009/api/cart', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          
          console.log('Cart response:', res.data); // Check the cart data structure

          // Update cart state with the correct data
          setCart(res.data.cart.items || []); // Use cart.items
        } catch (err) {
          console.error('Error fetching cart items:', err);
          setCart([]); // Empty cart on error
        }
      }
    };

    fetchCart();
  }, [user]);

  // Calculate total price of the cart with a safeguard to avoid undefined errors
  const totalPrice = (cart || []).reduce((total, item) => {
    if (item.product && item.product.price && item.quantity) {
      return total + item.product.price * item.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="cart text-center">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-unstyled">
          {cart.map((item, index) => (
  <li key={index}>
    {item.product && item.product.name ? (
      <div>
        <strong>{item.product.name}</strong> - ₹{item.product.price} x{" "}
        {item.quantity} = ₹{(item.product.price * item.quantity).toFixed(2)}
      </div>
    ) : (
      <div>Item data is missing</div>
    )}
  </li>
))}

          </ul>
          <hr />
          <div className="total">
            <strong>Total: ₹{totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
