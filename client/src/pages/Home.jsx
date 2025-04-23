// client/src/pages/Home.jsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Our E-Commerce Site</h1>
      <p>Please login or register to start shopping.</p>
      <Link to="/login">
        <Button variant="primary" className="me-2">Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="success">Register</Button>
      </Link>
    </Container>
  );
};

export default Home;
