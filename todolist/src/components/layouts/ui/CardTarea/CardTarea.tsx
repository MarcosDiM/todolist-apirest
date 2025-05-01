import { useState } from "react";
import { Card, Button, ButtonGroup, Form } from "react-bootstrap";
import { taskStore } from "../../../../store/todoStore";
import { ISprint, ITarea } from "../../../../types/ITodo";
import styles from "./CardTarea.module.css";
import { ModalVerTarea } from "../../../modals/ModalVerTarea/ModalVerTarea";
import Swal from "sweetalert2";
import { ModalEditarTarea } from "../../../modals/ModalEditarTarea/ModalEditarTarea";
import { sprintStore } from "../../../../store/sprintStore";
import axios from "axios";
import { eliminarTareaById } from "../../../../http/todoList";

interface cardTareaProps {
  tarea: ITarea;
  sprintId?: string; // Agregado para el cambio de estado
}

export const CardTarea = ({ tarea, sprintId }: cardTareaProps) => {
  const eliminarUnaTarea = taskStore((state) => state.eliminarUnaTarea);
  const cambiarEstadoTarea = sprintStore((state) => state.cambiarEstadoTarea);

  const [modalShow, setModalShow] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<ITarea | null>(
    null
  );
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleCloseModalEdit = () => setShowModalEdit(false);

  const handleEditarTarea = (tarea: ITarea) => {
    setTareaSeleccionada(tarea);
    setShowModalEdit(true);
  };

  const handleVerTarea = (tarea: ITarea) => {
    setTareaSeleccionada(tarea);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setTareaSeleccionada(null);
  };

  const handleEliminarTarea = async (id: string) => {
    const resultado = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      try {
        if (sprintId) {
          // Eliminar la tarea del sprint
          const response = await axios.get<{ sprints: ISprint[] }>(
            "http://localhost:3000/sprintList"
          );
          const sprints = response.data.sprints;

          const sprint = sprints.find((s) => s.id === sprintId);
          if (sprint) {
            sprint.tareas = sprint.tareas.filter((tarea) => tarea.id !== id);
            await axios.put("http://localhost:3000/sprintList", { sprints });
          }

          // Actualizar el estado local
          sprintStore.getState().eliminarTareaDeSprint(sprintId, id);
        } else {
          // Eliminar la tarea del backlog
          await eliminarTareaById(id);
          eliminarUnaTarea(id);
        }

        Swal.fire("¡Eliminada!", "La tarea ha sido eliminada.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar la tarea.", "error");
        console.error(error);
      }
    }
  };

  // Mover handleChangeEstado fuera de handleEliminarTarea
  const handleChangeEstado = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!sprintId) {
      console.error("El ID del sprint no está definido.");
      return;
    }

    const nuevoEstado = e.target.value as
      | "pendiente"
      | "en-progreso"
      | "completada";

    try {
      // Llamar a la función del store para actualizar el estado
      await cambiarEstadoTarea(sprintId, tarea.id!, nuevoEstado);
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
    }
  };

  return (
    <div className={styles.tareasContainer}>
      <Card key={tarea.id} className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <div className={styles.containerCard}>
            <h5 className={styles.cardTitle}>{tarea.titulo}</h5>

            <div className={styles.cardDescripcion}>{tarea.descripcion}</div>
            <div>
              <Form.Select
                value={tarea.status}
                onChange={handleChangeEstado}
                className="mt-2"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en-progreso">En Progreso</option>
                <option value="completada">Completada</option>
              </Form.Select>
            </div>

            <ButtonGroup className="gap-2 mt-2">
              <Button
                variant="warning"
                size="sm"
                className="rounded-2"
                onClick={() => handleVerTarea(tarea)}
              >
                <span className="material-symbols-outlined" style={{ color: "black" }}>visibility</span>
              </Button>

              <Button
                variant="primary"
                size="sm"
                className="rounded-2"
                onClick={() => handleEditarTarea(tarea)}
              >
                <span className="material-symbols-outlined" style={{ color: "black" }}>edit</span>
              </Button>

              <Button
                variant="danger"
                size="sm"
                className="rounded-2"
                onClick={() => handleEliminarTarea(tarea.id!)}
              >
                <span className="material-symbols-outlined" style={{ color: "black" }}>delete</span>
              </Button>
            </ButtonGroup>
          </div>
        </Card.Body>
      </Card>

      <ModalEditarTarea
        show={showModalEdit}
        tarea={tareaSeleccionada}
        handleClose={handleCloseModalEdit}
        sprintId={sprintId}
      />

      <ModalVerTarea
        show={modalShow}
        handleClose={handleClose}
        tarea={tareaSeleccionada}
      />
    </div>
  );
};
