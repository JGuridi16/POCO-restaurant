import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { availableTables } from "../store/dummy";
import ReservationCard from "../components/Card";

export default function Reservation() {
  
  const tables = [...availableTables];
  
  return (
    <Container className="mt-4 mx-auto">
      <Row>
        {tables && tables.map((table, index) => (
          <Col md={4} key={index}>
          <ReservationCard item={table} />
        </Col>))}
      </Row>
    </Container>
  );
};