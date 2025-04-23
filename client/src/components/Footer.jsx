import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light  py-3 mt-auto mt-3">
      <Container className="text-center">
        <small>&copy; {new Date().getFullYear()} My E-Commerce. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;
