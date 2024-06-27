import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { AppContext } from "../store";

export default function MyReservations() {
  const { myReservations } = useContext(AppContext);

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
            </tr>
          ))}
        </tbody>
      </Table> : <h4 className="m-5 text-center text-muted">No hay reservaciones</h4>}
    </Container>
  );
};