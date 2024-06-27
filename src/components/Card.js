import { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import ReservationModal from "./Modal";

export default function ReservationCard({ item }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Card className="p-2 my-1 shadow-sm">
      <ReservationModal
        item={item}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Card.Body>
        <Card.Title>{ item.name }</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Badge bg="primary">{ item.room }</Badge>
        </Card.Subtitle>
        <Card.Text>
          { item.description }
        </Card.Text>
        <Button onClick={() => setModalShow(true)} variant="outline-success" size='sm'>Reservar ahora</Button>
      </Card.Body>
    </Card>
  );
};