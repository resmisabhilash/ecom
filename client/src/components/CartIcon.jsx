// components/CartIcon.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { cartItemsCount } = useCart();

  return (
    <Link to="/cart">
      <div className="cart-icon">
        <i className="fa fa-shopping-cart"></i>
        {cartItemsCount > 0 && (
          <span className="cart-count">{cartItemsCount}</span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
