import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand ="sm" className="mx-2">
      <Navbar.Brand as={Link} to="/" className="flex-grow-1">
        Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to='/user'>Profile</Nav.Link>
      </Nav>
    </Navbar>
  );
}
