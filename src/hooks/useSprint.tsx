import { useShallow } from "zustand/shallow";
import { sprintStore } from "../store/sprintStore";
import {
  editarSprint,
  eliminarSprintById,
  getAllSprints,
  postNuevoSprint,
} from "../http/sprintList";
import { ISprint, ITarea } from "../types/ITodo";
import { editarTarea } from "../http/todoList";

export const useSprint = () => {
  const {
    sprints,
    setSprintArray,
    agregarUnSprint,
    eliminarUnSprint,
    editarUnSprint,
    editarTareaEnSprint,
  } = sprintStore(
    useShallow((state) => ({
      sprints: state.sprints,
      setSprintArray: state.setSprintArray,
      agregarUnSprint: state.agregarUnSprint,
      eliminarUnSprint: state.eliminarUnSprint,
      editarUnSprint: state.editarUnSprint,
      editarTareaEnSprint: state.editarTareaEnSprint,
    }))
  );

  const getSprints = async () => {
    const data = await getAllSprints();
    if (data) setSprintArray(data);
  };

  const crearSprint = async (nuevoSprint: ISprint) => {
    agregarUnSprint(nuevoSprint);
    try {
      await postNuevoSprint(nuevoSprint);
    } catch (error) {
      console.log("Algo salio mal");
    }
  };

  const putSprintEditar = async (sprintEditado: ISprint) => {
    const estadoPrevio = sprints.find((el) => el.id === sprintEditado.id);
    editarUnSprint(sprintEditado);
    try {
      await editarSprint(sprintEditado);
    } catch (error) {
      console.log("Error al editar el sprint en JSON Server", error);
      if (estadoPrevio) editarUnSprint(estadoPrevio);
    }
  };

  const eliminarSprint = async (idSprint: string) => {
    const estadoPrevio = sprints.find((el) => el.id === idSprint);
    eliminarUnSprint(idSprint);
    try {
      await eliminarSprintById(idSprint);
    } catch (error) {
      if (estadoPrevio) agregarUnSprint(estadoPrevio);
    }
  };
  const editarTareaEnSprintAsync = async (
    idSprint: string,
    idTarea: string,
    taskData: Partial<ITarea>
  ) => {
    try {
      // Actualiza el estado local
      editarTareaEnSprint(idSprint, idTarea, taskData);

      // Sincroniza con el backend
      const sprint = sprints.find((s) => s.id === idSprint);
      if (!sprint) throw new Error("Sprint no encontrado");

      const tareasActualizadas = sprint.tareas.map((tarea) =>
        tarea.id === idTarea ? { ...tarea, ...taskData } : tarea
      );

      const sprintActualizado: ISprint = { ...sprint, tareas: tareasActualizadas };
      await editarSprint(sprintActualizado);
    } catch (error) {
      console.error("Error al editar la tarea en el sprint:", error);
    }
  };

  return {
    getSprints,
    crearSprint,
    putSprintEditar,
    eliminarSprint,
    editarTareaEnSprintAsync,
    sprints,
  };
};
