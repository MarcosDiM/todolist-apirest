import React, { useEffect, useState } from "react";
import { taskStore } from "../../../store/todoStore";
import { Button, Form, Modal } from "react-bootstrap";
import { ITarea } from "../../../types/ITodo";
import { sprintStore } from "../../../store/sprintStore";
import { useSprint } from "../../../hooks/useSprint";

interface Props {
  tarea: ITarea | null;
  show: boolean;
    handleClose: () => void;
    sprintId?: string;
}

export const ModalEditarTarea = ({ tarea, show, handleClose, sprintId }: Props) => {
  const editarTarea = taskStore((state) => state.editarUnaTarea);
  const { editarTareaEnSprintAsync } = useSprint();

  const [descripcion, setDescripcion] = useState(tarea?.descripcion || "");
  const [fechaLimite, setFechaLimite] = useState(tarea?.fechaLimite || "");
  const [titulo, setTitulo] = useState(tarea?.titulo || "");

  useEffect(() => {
    if (tarea) {
      setTitulo(tarea.titulo);
      setDescripcion(tarea.descripcion);
      setFechaLimite(tarea.fechaLimite);
    }
  }, [tarea]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !descripcion || !fechaLimite) return;

    const tareaEditada: ITarea = {
      id: tarea?.id,
      titulo,
      descripcion,
      fechaLimite,
      status: tarea?.status || "pendiente",
    };

    try {
     if (sprintId) {
        await editarTareaEnSprintAsync(sprintId, tareaEditada.id!, tareaEditada);
     } else {
        await editarTarea(tareaEditada);
     }
      handleClose();
    } catch (error) {
      console.error("Error al editar la tarea:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
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
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
