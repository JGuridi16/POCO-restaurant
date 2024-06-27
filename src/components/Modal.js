import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AppContext } from '../store';
import { Bounce, toast } from 'react-toastify';

export default function ReservationModal({ item, show, onHide }) {
  const { myReservations, setMyReservations } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [reservation, setReservation] = useState({});
  
  const saveReservation = () => {
    if(!reservation.fullname
      || !reservation.documentId
      || !reservation.fromTime
      || !reservation.toTime
    ) {
      
      toast.error('Completar campos requeridos.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    
    if(reservation.fromTime > reservation.toTime) {
      toast.error('La hora inicio no puede ser mayor a la de salida.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    
    const newReservation = {
      ...reservation,
      tableId: item.id,
      tableName: item.name
    };
    setMyReservations([...myReservations, newReservation])
    setShowModal(false);
    // toast.success('Guardado exitosamente!.', {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: false,
    //   progress: undefined,
    //   theme: "light",
    //   transition: Bounce,
    // });
  };

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  return (
    <>
    <Modal
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          { item.name }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='px-2'>
          <Form.Group className="mb-3" controlId="formBasicFullname">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control required onChange={(e) => setReservation(prev => ({ ...prev, fullname: e.target.value  }))} type="text" placeholder="Escriba su nombre" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicDocId">
            <Form.Label>Cédula</Form.Label>
            <Form.Control required onChange={(e) => setReservation(prev => ({ ...prev, documentId: e.target.value  }))} type="number" placeholder="Escriba su cédula" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicFrom">
            <Form.Label>Desde</Form.Label>
            <Form.Control required onChange={(e) => setReservation(prev => ({ ...prev, fromTime: e.target.value  }))} type="time" placeholder="Desde" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicUntil">
            <Form.Label>Hasta</Form.Label>
            <Form.Control required onChange={(e) => setReservation(prev => ({ ...prev, toTime: e.target.value  }))} type="time" placeholder="Hasta" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Button onClick={saveReservation} variant="success" className='m-2 mt-3' size='lg' type="button">
        Reservar
      </Button>
    </Modal>
    </>
  );
};
