import React from 'react';
import '../App.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TopNavbar = () => {
  return (
    <Navbar className="nav" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Budgeting App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#Analytics">Analytics</Nav.Link>
            <Nav.Link href="#About">About</Nav.Link>
            <Nav.Link href="#Login">Log In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;