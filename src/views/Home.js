import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const bookTable = () => {
    navigate('online-reservation');
  };
  return (
    <Container fluid className="landing-page">
      <Row>
        <Col md="4" className="banner p-5 d-flex align-items-center justify-content-center">
          <Row>
            <Col md="12">
              <h1 className="banner-title text-white fw-bold">Compartir es vivir</h1>
              <p className="banner-subtitle my-4 fw-bold">
                POCO ya tiene su plataforma para que sus clientes tengan puedan realizar reservaciones
                desde cualquier lugar. Desde aquí podrás visualizar la disponibilidad de mesas para 
                tus eventos más especiales.
              </p>
            </Col>
            <Col md="12">
            <Button onClick={bookTable} variant="light" className="mt-2 fw-bold" size="lg">Ver más</Button>
            </Col>
          </Row>
        </Col>
        <Col className="thumbnail">
        </Col>
      </Row>
    </Container>
  );
};