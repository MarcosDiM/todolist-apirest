import { useShallow } from "zustand/shallow";
import { sprintStore } from "../store/sprintStore";
import { ISprint, ITarea } from "../types/ITodo";

export const useSprint = () => {
  const {
    sprints,
    fetchSprints,
    agregarUnSprint,
    editarUnSprint,
    eliminarUnSprint,
    // editarTareaEnSprint,
  } = sprintStore(
    useShallow((state) => ({
      sprints: state.sprints,
      fetchSprints: state.fetchSprints,
      agregarUnSprint: state.agregarUnSprint,
      editarUnSprint: state.editarUnSprint,
      eliminarUnSprint: state.eliminarUnSprint,
      // editarTareaEnSprint: state.editarTareaEnSprint,
    }))
  );

  const getSprints = async () => {
    await fetchSprints();
  };

  const crearSprint = async (nuevoSprint: ISprint) => {
    await agregarUnSprint(nuevoSprint);
  };

  const putSprintEditar = async (sprintEditado: ISprint) => {
    await editarUnSprint(sprintEditado);
  };

  const eliminarSprint = async (idSprint: string) => {
    await eliminarUnSprint(idSprint);
  };

  // const editarTareaEnSprintAsync = async (
  //   idSprint: string,
  //   idTarea: string,
  //   taskData: Partial<ITarea>
  // ) => {
  //   await editarTareaEnSprint(idSprint, idTarea, taskData);
  // };

  return {
    getSprints,
    crearSprint,
    putSprintEditar,
    eliminarSprint,
    // editarTareaEnSprintAsync,
    sprints,
  };
};
