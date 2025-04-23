import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/products'); // Redirect to products page if the user is not an admin
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:6009/api/products');
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:6009/api/users');
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
    fetchUsers();
  }, [navigate]);

  const handleProductCreate = () => {
    navigate('/create-product'); // Redirect to a page where admin can create products
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-actions">
        <button onClick={handleProductCreate} className="btn btn-success">
          Create New Product
        </button>
      </div>

      <h3>Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ₹{product.price}
            {/* You can add edit/delete buttons here */}
          </li>
        ))}
      </ul>

      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
            {/* You can add edit/delete buttons for users here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
