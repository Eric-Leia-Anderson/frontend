import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//if user is not logged in, have signup page instead
//
const TopNavbar = () => {
  return (
    
    <Navbar className="nav" variant="light" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">Budgeting App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/login">Log In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
    // <header>
    //   <div className='container'>
    //     <Link to="/">
    //       <h2>Home</h2>
    //     </Link>
    //   </div>
    // </header>

  );
};

export default TopNavbar;