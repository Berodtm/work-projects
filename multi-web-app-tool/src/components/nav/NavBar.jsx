import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function NavBar() {
  // Removed all theme-related props and logic

  return (
    <Navbar bg="dark" variant="dark" className="navbar-custom"> {/* Set navbar to always use the light variant */}
      <Container>
        <Navbar.Brand href="#home">POC Toolkit</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Confluence</Nav.Link>
          <Nav.Link href="#features">What's New</Nav.Link>
          <Nav.Link href="#pricing">POC Resource Hub</Nav.Link>
        </Nav>
        {/* Removed the theme toggle button */}
      </Container>
    </Navbar>
  );
}

export default NavBar;
