import { create } from "zustand";
import { ISprint } from "../types/ITodo";
import {
  getAllSprints,
  postNuevoSprint,
  editarSprint,
  eliminarSprintById,
} from "../http/sprintList";

interface ISprintStore {
  sprints: ISprint[];
  fetchSprints: () => Promise<void>;
  agregarUnSprint: (nuevoSprint: Partial<ISprint>) => Promise<void>;
  editarUnSprint: (sprintEditado: ISprint) => Promise<void>;
  eliminarUnSprint: (idSprint: string) => Promise<void>;
}

export const sprintStore = create<ISprintStore>((set) => ({
  sprints: [],

  // Traer array de sprints desde el backend
  fetchSprints: async () => {
    try {
      const sprints = await getAllSprints();
      set(() => ({ sprints }));
    } catch (error) {
      console.error("Error al traer sprints:", error);
    }
  },

  // Agregar un sprint
  agregarUnSprint: async (nuevoSprint) => {
    try {
      const sprintCreado = await postNuevoSprint(nuevoSprint);
      set((state) => ({
        sprints: [...state.sprints, sprintCreado],
      }));
    } catch (error) {
      console.error("Error al agregar sprint:", error);
    }
  },

  // Editar un sprint
  editarUnSprint: async (sprintEditado) => {
    try {
      const sprintActualizado = await editarSprint(sprintEditado);
      set((state) => ({
        sprints: state.sprints.map((s) =>
          s._id === sprintActualizado._id ? sprintActualizado : s
        ),
      }));
    } catch (error) {
      console.error("Error al editar sprint:", error);
    }
  },

  // Eliminar un sprint
  eliminarUnSprint: async (idSprint) => {
    try {
      await eliminarSprintById(idSprint);
      set((state) => ({
        sprints: state.sprints.filter((sprint) => sprint._id !== idSprint),
      }));
    } catch (error) {
      console.error("Error al eliminar sprint:", error);
    }
  },
}));
