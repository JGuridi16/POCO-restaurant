import React, { useContext, useEffect } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../store/auth';

export default function Layout() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {}, [JSON.stringify(user)]);

  return (
    <Navbar expand="lg" className="app-nav bg-white shadow-sm">
      <Container>
        <Navbar.Brand>
          <img style={{ cursor: 'pointer' }} onClick={goHome} src={require('../assets/poco.png')} alt="logo" height="50" width="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home">
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/online-reservation">
              Reservaciones
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-reservations">
              Mis Reservaciones
            </Nav.Link>
          </Nav>
          <Nav className="me-end">
            <div data-testid="email-data" className="d-flex justify-content-center align-items-center px-3">
              { user?.email }
            </div>
            <Button data-testid="logout-btn" as={NavLink} onClick={logoutHandler}>
              Cerrar sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
