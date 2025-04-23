import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap'; // Import necessary components from React Bootstrap

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // For programmatic navigation after logout

  // Handle Logout
  const handleLogout = () => {
    logout(); // Assuming logout function clears user context and local storage
    navigate('/'); // Redirect to home page
  };

  return (
    <Navbar bg="light"  expand="lg">
      <Navbar.Brand as={Link} to="/">
        My E-commerce
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user ? (
            <>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
