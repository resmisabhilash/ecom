import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        'http://localhost:6009/api/cart',
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert('Item added to cart!');
    } catch (error) {
      alert('Failed to add item to cart');
      console.error(error);
    }
  };

  return (
    <div className="card m-2 p-2" style={{ width: '18rem' }}>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">₹{product.price}</p>
        <button onClick={handleAddToCart} className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
