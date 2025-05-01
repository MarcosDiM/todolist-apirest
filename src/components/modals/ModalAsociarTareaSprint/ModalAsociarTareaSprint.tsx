import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { sprintStore } from "../../../store/sprintStore";
import { taskStore } from "../../../store/todoStore";
import axios from "axios";

interface ModalAsociarTareaSprintProps {
  show: boolean;
  handleClose: () => void;
  sprintId: string;
}

export const ModalAsociarTareaSprint = ({
  show,
  handleClose,
  sprintId,
}: ModalAsociarTareaSprintProps) => {
  const tareas = taskStore((state) => state.tareas);
  const asociarTareaASprint = sprintStore((state) => state.asociarTareaASprint);
  const eliminarTareaDelBacklog = taskStore(
    (state) => state.eliminarTareaDelBacklog
  );

  const [tareaSeleccionada, setTareaSeleccionada] = useState<string>("");

  const handleAsociarTarea = async () => {
    const tarea = tareas.find((t) => t.id === tareaSeleccionada);
    if (tarea) {
      try {
        // Actualizar el sprint en el backend
        const sprintResponse = await axios.get<{ sprints: any[] }>(
          "http://localhost:3000/sprintList"
        );
        const sprints = sprintResponse.data.sprints;
        const sprint = sprints.find((s) => s.id === sprintId);
        if (sprint) {
          sprint.tareas.push({ ...tarea, status: "pendiente" });
          await axios.put("http://localhost:3000/sprintList", { sprints });
        }

        // Actualizar el backlog en el backend
        const backlogResponse = await axios.get<{ tareas: any[] }>(
          "http://localhost:3000/backlog"
        );
        const backlogTareas = backlogResponse.data.tareas.filter(
          (t) => t.id !== tarea.id
        );
        await axios.put("http://localhost:3000/backlog", {
          tareas: backlogTareas,
        });

        // Actualizar el estado local
        asociarTareaASprint(sprintId, tarea);
        eliminarTareaDelBacklog(tarea.id);

        handleClose();
      } catch (error) {
        console.error("Error al asociar la tarea al sprint:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Asociar Tarea al Sprint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="tareaSeleccionada">
            <Form.Label>Selecciona una tarea</Form.Label>
            <Form.Control
              as="select"
              value={tareaSeleccionada}
              onChange={(e) => setTareaSeleccionada(e.target.value)}
            >
              <option value="">Selecciona una tarea</option>
              {tareas.map((tarea) => (
                <option key={tarea.id} value={tarea.id}>
                  {tarea.titulo}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAsociarTarea}>
          Asociar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
