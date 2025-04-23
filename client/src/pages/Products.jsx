import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // to get token/user
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext); // assumes token is in user.token

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:6009/api/products');
      setProducts(res.data);
    };
    fetchData();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        'http://localhost:6009/api/cart',
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert('Added to cart');
    } catch (err) {
      alert('Add to cart failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
          <ProductCard product={product} onAddToCart={handleAddToCart} />
        </div>
          // <div className="col-md-4" key={product._id}>
          //   <div className="card mb-4">
          //     <img src={product.image} className="card-img-top" alt={product.name} />
          //     <div className="card-body">
          //       <h5 className="card-title">{product.name}</h5>
          //       <p className="card-text">{product.description}</p>
          //       <p><strong>₹{product.price}</strong></p>
          //       <button
          //         className="btn btn-primary"
          //         onClick={() => handleAddToCart(product._id)}
          //       >
          //         Add to Cart
          //       </button>
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
