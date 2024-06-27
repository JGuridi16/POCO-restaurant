import React, { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { AppContext } from "../store";
import { Bounce, toast } from 'react-toastify';

export default function MyReservations() {
  const { myReservations } = useContext(AppContext);

  const dropReservationById = (reservationId) => {
    toast.success('Reservación removida', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <Container className="mt-4 mx-auto">
      { myReservations && myReservations.length ? <Table striped bordered hover>
        <thead>
          <tr>
            <th>Número de Mesa</th>
            <th>Nombre Completo</th>
            <th>Cédula</th>
            <th>Desde</th>
            <th>Hasta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { myReservations.map((item, index) => (
            <tr key={index}>
              <td>{ item.tableName }</td>
              <td>{ item.fullname }</td>
              <td>{ item.documentId }</td>
              <td>{ item.fromTime }</td>
              <td>{ item.toTime }</td>
              <td>
                <div class="d-flex justify-content-center">
                  <Button onClick={() => dropReservationById(item.id)} variant="danger" className="fw-bold" size="sm">
                    🗑
                  </Button>    
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> : <h4 className="m-5 text-center text-muted">No hay reservaciones</h4>}
    </Container>
  );
};
