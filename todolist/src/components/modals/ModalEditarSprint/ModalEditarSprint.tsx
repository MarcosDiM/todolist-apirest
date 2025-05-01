import { useEffect, useState } from "react";
import { sprintStore } from "../../../store/sprintStore";
import { ISprint } from "../../../types/ITodo";
import { Button, Form, Modal } from "react-bootstrap";

interface ModalEditarSprintProps {
    show: boolean;
    handleClose: () => void;
    sprint: ISprint;
}

export const ModalEditarSprint = ({show, handleClose, sprint}: ModalEditarSprintProps) => {

    const editarSprint = sprintStore((state) => state.editarUnSprint);

    const [nombre, setNombre] = useState(sprint.nombre || "");
    const [fechaInicio, setFechaInicio] = useState(sprint.fechaInicio || "");
    const [fechaCierre, setFechaCierre] = useState(sprint.fechaCierre || "");

    useEffect(() => {
        if (show && sprint) {
            setNombre(sprint.nombre);
            setFechaInicio(sprint.fechaInicio);
            setFechaCierre(sprint.fechaCierre);
        }
    }, [show, sprint]);

    const handleEditSprint = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre || !fechaInicio || !fechaCierre) return;

        const sprintEditado: ISprint = {
            id: sprint?.id,
            nombre,
            fechaInicio,
            fechaCierre: fechaCierre,
            tareas: sprint.tareas || [],
        };

        try {
            await editarSprint(sprintEditado);
            handleClose();
        } catch (error) {
            console.error("Error al editar el sprint:", error);
        }
    }



  return (
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Sprint</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleEditSprint}>
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
                    Guardar
                </Button>
                </Form>
            </Modal.Body>
            </Modal>
  )
}
