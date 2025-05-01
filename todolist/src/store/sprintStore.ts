import { create } from "zustand";
import { ISprint, ITarea } from "../types/ITodo";
import { editarSprint, postNuevoSprint } from "../http/sprintList";
import axios from "axios";

interface ISprintStore {
  sprints: ISprint[];
  currentSprint: ISprint | null;
  setCurrentSprint: (sprint: ISprint | null) => void;
  setSprintArray: (arrayDesprint: ISprint[]) => void;
  agregarUnSprint: (nuevoSprint: ISprint) => void;
  editarUnSprint: (sprintEditado: ISprint) => void;
  eliminarUnSprint: (idSprint: string) => void;
  editarTareaEnSprint: (
    idSprint: string,
    idTarea: string,
    taskData: Partial<ITarea>
  ) => void;
  eliminarTareaDeSprint: (idSprint: string, idTarea: string) => void;
  cambiarEstadoTarea: (
    idSprint: string,
    idTarea: string,
    nuevoEstado: "pendiente" | "en-progreso" | "completada"
  ) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
  sprints: [],
  currentSprint: null,

  setCurrentSprint: (sprint) => set({ currentSprint: sprint }),
  // Agregar array de sprints

  setSprintArray: (arrayDesprint) => set(() => ({ sprints: arrayDesprint })),

  // Agregar un sprint

  agregarUnSprint: async (nuevoSprint) => {
    await postNuevoSprint(nuevoSprint);
    set((state) => ({
      sprints: [...state.sprints, nuevoSprint],
    }));
  },

  //Editar un sprint

  editarUnSprint: async (sprintEditado) => {
    try {
      const updateSprint = await editarSprint(sprintEditado);

      set((state) => ({
        sprints: state.sprints.map((s) =>
          s.id === updateSprint.id ? updateSprint : s
        ),
        currentSprint:
          state.currentSprint?.id === updateSprint.id
            ? updateSprint
            : state.currentSprint,
      }));
    } catch (error) {
      console.error("Error al guardar el sprint:", error);
      throw error;
    }
  },

  //Eliminar un sprint

  eliminarUnSprint: (idSprint) =>
    set((state) => {
      const arregloSprint = state.sprints.filter(
        (sprint) => sprint.id !== idSprint
      );
      return { sprints: arregloSprint };
    }),

  asociarTareaASprint: (idSprint: string, tarea: ITarea) =>
    set((state) => {
      if (!tarea.id || !tarea.titulo || !tarea.descripcion) {
        console.error("La tarea no tiene el formato correcto:", tarea);
        return state;
      }

      const sprintsActualizados = state.sprints.map((sprint) =>
        sprint.id === idSprint
          ? {
              ...sprint,
              tareas: [
                ...sprint.tareas,
                { ...tarea, status: tarea.status || "pendiente" },
              ],
            }
          : sprint
      );
      return { sprints: sprintsActualizados };
    }),
  cambiarEstadoTarea: async (
    idSprint: string,
    idTarea: string,
    nuevoEstado: "pendiente" | "en-progreso" | "completada"
  ) => {
    // Actualizar el estado local inmediatamente
    set((state) => {
      const sprintsActualizados = state.sprints.map((sprint) => {
        if (sprint.id === idSprint) {
          const tareasActualizadas = sprint.tareas.map((tarea) =>
            tarea.id === idTarea ? { ...tarea, status: nuevoEstado } : tarea
          );
          return { ...sprint, tareas: tareasActualizadas };
        }
        return sprint;
      });
      return { sprints: sprintsActualizados };
    });

    try {
      // Actualizar el backend
      const response = await axios.get<{ sprints: ISprint[] }>(
        "http://localhost:3000/sprintList"
      );
      const sprints = response.data.sprints;

      const sprint = sprints.find((s) => s.id === idSprint);
      if (sprint) {
        const tarea = sprint.tareas.find((t) => t.id === idTarea);
        if (tarea) {
          tarea.status = nuevoEstado; // Actualizar el estado de la tarea
          await axios.put("http://localhost:3000/sprintList", { sprints }); // Guardar en el backend
        }
      }
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
    }
  },
  eliminarTareaDeSprint: (idSprint: string, idTarea: string) =>
    set((state) => {
      const sprintsActualizados = state.sprints.map((sprint) => {
        if (sprint.id === idSprint) {
          const tareasActualizadas = sprint.tareas.filter(
            (tarea) => tarea.id !== idTarea
          );
          return { ...sprint, tareas: tareasActualizadas };
        }
        return sprint;
      });
      return { sprints: sprintsActualizados };
    }),
  editarTareaEnSprint: async (idSprint, idTarea, taskData) => {
    set((state) => {
      const sprintsActualizados = state.sprints.map((sprint) => {
        if (sprint.id === idSprint) {
          const tareasActualizadas = sprint.tareas.map((tarea) =>
            tarea.id === idTarea ? { ...tarea, ...taskData } : tarea
          );
          return { ...sprint, tareas: tareasActualizadas };
        }
        return sprint;
      });

      return { sprints: sprintsActualizados };
    });
  },
}));
