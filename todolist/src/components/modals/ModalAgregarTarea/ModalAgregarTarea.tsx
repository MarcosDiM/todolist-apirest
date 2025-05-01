import React, { useState } from "react";
import { taskStore } from "../../../store/todoStore";
import { Button, Form, Modal } from "react-bootstrap";
import { ITarea } from "../../../types/ITodo";

interface Props {
  show: boolean;
  handleClose: () => void;
}

export const ModalAgregarTarea = ({ show, handleClose }: Props) => {
  const agregarUnaTarea = taskStore((state) => state.agregarUnaTarea);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !descripcion || !fechaLimite) return;

    const nuevaTarea: ITarea = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      fechaLimite,
      status: "pendiente",
    };

    agregarUnaTarea(nuevaTarea);
    setTitulo("");
    setDescripcion("");
    setFechaLimite("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar nueva tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="titulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fechaLimite">
            <Form.Label>Fecha límite</Form.Label>
            <Form.Control
              type="date"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Agregar Tarea
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
