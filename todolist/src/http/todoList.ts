import axios from "axios";
import { ITarea } from "../types/ITodo";

const API_URL = "http://localhost:3000/tasks";

// Obtener todas las tareas
export const getAllTareas = async (): Promise<ITarea[]> => {
  try {
    const response = await axios.get<ITarea[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    throw error;
  }
};


// Agregar una nueva tarea
export const postNuevaTarea = async (nuevaTarea: Partial<ITarea>): Promise<ITarea> => {
  try {
    const response = await axios.post<ITarea>(API_URL, nuevaTarea);
    return response.data;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
};

// Editar una tarea existente
export const editarTarea = async (tareaEditada: ITarea): Promise<ITarea> => {
  try {
    const response = await axios.put<ITarea>(`${API_URL}/${tareaEditada._id}`, tareaEditada);
    return response.data;
  } catch (error) {
    console.error("Error al editar la tarea:", error);
    throw error;
  }
};

// Eliminar una tarea por ID
export const eliminarTareaById = async (idTarea: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${idTarea}`);
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    throw error;
  }
};
