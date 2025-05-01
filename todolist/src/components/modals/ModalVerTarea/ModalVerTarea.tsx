// src/components/modals/ModalVerTarea.tsx
import { Modal, Button } from "react-bootstrap";
import { ITarea } from "../../../types/ITodo";

interface Props {
  show: boolean;
  handleClose: () => void;
  tarea: ITarea | null;
}

export const ModalVerTarea = ({ show, handleClose, tarea }: Props) => {
  if (!tarea) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de la Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Título:</strong> {tarea.titulo}
        </p>
        <p>
          <strong>Descripción:</strong> {tarea.descripcion}
        </p>
        <p>
          <strong>Fecha Límite:</strong> {tarea.fechaLimite}
        </p>
        <p>
          <strong>Estado:</strong> {tarea.status}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
