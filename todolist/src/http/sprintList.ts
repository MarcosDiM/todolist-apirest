import axios from "axios";
import { ISprint } from "../types/ITodo";


const API_URL = "http://localhost:3000/sprints";

export const getAllSprints = async () : Promise<ISprint[]> => {
    try {
        const response = await axios.get<ISprint[]>(API_URL);
        return response.data;
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
        throw error;
      }
};

export const postNuevoSprint = async (nuevoSprint: Partial<ISprint>): Promise<ISprint> => {
    try {
        const response = await axios.post<ISprint>(API_URL, nuevoSprint);
        return response.data;
      } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw error;
    }
};


export const editarSprint = async (sprintEditado: ISprint): Promise<ISprint> => {
    try {
      const response = await axios.put<ISprint>(`${API_URL}/${sprintEditado._id}`, sprintEditado);
      return response.data;
    } catch (error) {
      console.error("Error al editar la tarea:", error);
      throw error;
    }
  };

export const eliminarSprintById = async (idSprint: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${idSprint}`);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      throw error;
    }
  };
