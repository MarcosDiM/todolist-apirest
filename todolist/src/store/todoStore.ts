import { create } from "zustand";
import { ITarea } from "../types/ITodo";
import { 
  getAllTareas,
  postNuevaTarea,
  editarTarea,
  eliminarTareaById, 
} from "../http/todoList";

interface ITaskStore {
  tareas: ITarea[];
  fetchTareas: () => Promise<void>;
  agregarUnaTarea: (nuevaTarea: Partial<ITarea>) => Promise<void>;
  editarUnaTarea: (tareaEditada: ITarea) => Promise<void>;
  eliminarUnaTarea: (idTarea: string) => Promise<void>;
}

export const taskStore = create<ITaskStore>((set) => ({
  tareas: [],

  //Agregar array de tareas

  fetchTareas: async () => {
    try {
      const tareas = await getAllTareas();
      set(() => ({ tareas }));
    } catch (error) {
      console.error("Error al traer tareas:", error);
    }
  },

  //Agregar una tarea

  agregarUnaTarea: async (nuevaTarea) => {
    try {
      const tareaCreada = await postNuevaTarea(nuevaTarea);
      set((state) => ({
        tareas: [...state.tareas, tareaCreada],
      }));
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  },

  //Editar una tarea

  editarUnaTarea: async (tareaEditada) => {
    try {
      const tareaActualizada = await editarTarea(tareaEditada);
      set((state) => ({
        tareas: state.tareas.map((t) =>
          t._id === tareaActualizada._id ? tareaActualizada : t
        ),
      }));
    } catch (error) {
      console.error("Error al editar tarea:", error);
    }
  },

  //eliminar una tarea
  eliminarUnaTarea: async (idTarea) => {
    try {
      await eliminarTareaById(idTarea);
      set((state) => ({
        tareas: state.tareas.filter((tarea) => tarea._id !== idTarea),
      }));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  },
}));
