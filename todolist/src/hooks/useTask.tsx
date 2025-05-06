import { useShallow } from "zustand/shallow";
import { taskStore } from "../store/todoStore";
import { ITarea } from "../types/ITodo";

export const useTask = () => {
  const {
    tareas,
    fetchTareas,
    agregarUnaTarea,
    eliminarUnaTarea,
    editarUnaTarea,
  } = taskStore(
    useShallow((state) => ({
      tareas: state.tareas,
      fetchTareas: state.fetchTareas,
      agregarUnaTarea: state.agregarUnaTarea,
      eliminarUnaTarea: state.eliminarUnaTarea,
      editarUnaTarea: state.editarUnaTarea,
    }))
  );

  const getTareas = async () => {
    await fetchTareas();
  };

  const crearTarea = async (nuevaTarea: ITarea) => {
    await agregarUnaTarea(nuevaTarea);
  };

  const putTareaEditar = async (tareaEditada: ITarea) => {
    await editarUnaTarea(tareaEditada);
  };

  const eliminarTarea = async (idTarea: string) => {
    await eliminarUnaTarea(idTarea);
  };

  return {
    getTareas,
    crearTarea,
    putTareaEditar,
    eliminarTarea,
    tareas,
  };
};
