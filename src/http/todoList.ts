import axios from "axios";
import { ITarea } from "../types/ITodo";

const API_URL = "http://localhost:3000/backlog";

// Obtener todas las tareas
export const getAllTareas = async (): Promise<ITarea[]> => {
  try {
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL); // Obtener el objeto "backlog"
    return response.data.tareas; // Retornar solo el array de tareas
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    throw error;
  }
};

// Agregar una nueva tarea
export const postNuevaTarea = async (nuevaTarea: ITarea): Promise<ITarea> => {
  try {
    // Obtener las tareas actuales
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
    const tareasActuales = response.data.tareas;

    // Agregar la nueva tarea al array
    const nuevasTareas = [...tareasActuales, nuevaTarea];

    // Actualizar el objeto "backlog" con las nuevas tareas
    await axios.put(API_URL, { tareas: nuevasTareas });

    return nuevaTarea; // Retornar la nueva tarea
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
};

// Editar una tarea existente
export const editarTarea = async (tareaEditada: ITarea): Promise<ITarea> => {
  try {
    // Obtener las tareas actuales desde el backlog
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
    const tareasActuales = response.data.tareas;

    // Actualizar la tarea correspondiente
    const tareasActualizadas = tareasActuales.map((tarea) =>
      tarea.id === tareaEditada.id ? tareaEditada : tarea
    );

    // Actualizar el objeto "backlog" con las tareas actualizadas
    await axios.put(API_URL, { tareas: tareasActualizadas });

    return tareaEditada; // Retornar la tarea editada
  } catch (error) {
    console.error("Error al editar la tarea:", error);
    throw error;
  }
};

// Eliminar una tarea por ID
export const eliminarTareaById = async (idTarea: string): Promise<void> => {
  try {
    // Obtener las tareas actuales
    const response = await axios.get<{ tareas: ITarea[] }>(
      "http://localhost:3000/backlog"
    );
    const tareasActuales = response.data.tareas;

    // Filtrar las tareas para eliminar la tarea con el ID especificado
    const tareasActualizadas = tareasActuales.filter(
      (tarea) => tarea.id !== idTarea
    );

    // Actualizar el objeto "backlog" con las tareas restantes
    await axios.put("http://localhost:3000/backlog", {
      tareas: tareasActualizadas,
    });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    throw error;
  }
};
