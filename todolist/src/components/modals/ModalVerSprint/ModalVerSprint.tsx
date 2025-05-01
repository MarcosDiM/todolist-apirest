import { Button, Modal } from "react-bootstrap";
import { ISprint } from "../../../types/ITodo";

interface ModalVerSprintProps {
  show: boolean;
  handleClose: () => void;
  sprint: ISprint | null;
}

export const ModalVerSprint = ({
  show,
  handleClose,
  sprint,
}: ModalVerSprintProps) => {
  if (!sprint) return null;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de la Sprint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Nombre:</strong> {sprint.nombre}
        </p>
        <p>
          <strong>Fecha Inicio:</strong> {sprint.fechaInicio}
        </p>
        <p>
          <strong>Fecha Límite:</strong> {sprint.fechaCierre}
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
