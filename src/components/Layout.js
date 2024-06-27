import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="app-nav bg-white shadow-sm">
      <Container>
        <Navbar.Brand>
          <img style={{ cursor: 'pointer' }} onClick={goHome} src={require('../assets/poco.png')} alt="logo" height="50" width="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/online-reservation">
              Reservaciones
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-reservations">
              Mis Reservaciones
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
