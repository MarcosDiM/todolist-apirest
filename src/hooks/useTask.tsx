import { useShallow } from "zustand/shallow";
import { taskStore } from "../store/todoStore";
import {
  editarTarea,
  eliminarTareaById,
  getAllTareas,
  postNuevaTarea,
} from "../http/todoList";
import { ITarea } from "../types/ITodo";

export const useTask = () => {
  const {
    tareas,
    setArrayTareas,
    agregarUnaTarea,
    eliminarUnaTarea,
    editarUnaTarea,
  } = taskStore(
    useShallow((state) => ({
      tareas: state.tareas,

      setArrayTareas: state.setArrayTareas,
      agregarUnaTarea: state.agregarUnaTarea,
      eliminarUnaTarea: state.eliminarUnaTarea,
      editarUnaTarea: state.editarUnaTarea,
    }))
  );

  const getTareas = async () => {
    const data = await getAllTareas();
    if (data) setArrayTareas(data);
  };

  const crearTarea = async (nuevaTarea: ITarea) => {
    agregarUnaTarea(nuevaTarea);
    try {
      await postNuevaTarea(nuevaTarea);
    } catch (error) {
      console.log("Algo salio mal");
    }
  };

  const putTareaEditar = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
    // Actualiza el estado local
    try {
      await editarTarea(tareaEditada);
      editarUnaTarea(tareaEditada); // Actualiza en JSON Server
    } catch (error) {
      console.error("Error al editar la tarea en JSON Server:", error);
      if (estadoPrevio) editarUnaTarea(estadoPrevio); // Revertir cambios locales
    }
  };

  const eliminarTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);
    eliminarUnaTarea(idTarea);
    try {
      await eliminarTareaById(idTarea);
    } catch (error) {
      if (estadoPrevio) agregarUnaTarea(estadoPrevio);
    }
  };

  return {
    getTareas,
    crearTarea,
    putTareaEditar,
    eliminarTarea,
    tareas,
  };
};
