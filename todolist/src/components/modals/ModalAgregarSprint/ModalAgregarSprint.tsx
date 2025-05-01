import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { sprintStore } from "../../../store/sprintStore";


interface AgregarSprintProps {
    show: boolean;
    handleClose: () => void;
}

export const ModalAgregarSprint = ({show, handleClose}: AgregarSprintProps) => {

    const agregarUnSprint = sprintStore((state) => state.agregarUnSprint);

    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");

    const handleSubmitSprint = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre || !fechaInicio || !fechaCierre) return;

        const nuevoSprint = {
            id: Date.now().toString(),
            nombre,
            fechaInicio,
            fechaCierre,
            tareas: [],
        };

        agregarUnSprint(nuevoSprint);
        setNombre("");
        setFechaInicio("");
        setFechaCierre("");
        handleClose();
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar un nuevo Sprint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitSprint}>
          <Form.Group className="mb-3" controlId="titulo">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fechaLimite">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fechaLimite">
            <Form.Label>Fecha límite</Form.Label>
            <Form.Control
              type="date"
              value={fechaCierre}
              onChange={(e) => setFechaCierre(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Agregar Sprint
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
