import { useLocation } from "react-router";
import { sprintStore } from "../../../store/sprintStore";
import { Header } from "../../layouts/Header/Header";
import { Home } from "../../layouts/Home/Home";
import styles from "./SprintScreen.module.css";
import { CardTarea } from "../../layouts/ui/CardTarea/CardTarea";
import { ISprint } from "../../../types/ITodo";
import { useEffect, useState } from "react";

export const SprintScreen = () => {
  const location = useLocation();
  const sprintFromLocation = location.state?.sprint as ISprint;
  const [sprint, setSprint] = useState<ISprint | null>(sprintFromLocation);

  useEffect(() => {
    // Suscribirse a los cambios en el estado global
    const unsubscribe = sprintStore.subscribe((state) => {
      const updatedSprint = state.sprints.find((s) => s.id === sprintFromLocation.id);
      if (updatedSprint) {
        setSprint(updatedSprint);
      }
    });

    return () => unsubscribe(); // Limpiar la suscripción al desmontar el componente
  }, [sprintFromLocation.id]);

  if (!sprint) {
    throw new Error("No se encontró el sprint seleccionado.");
  }

  const tareasPendientes = sprint.tareas.filter(
    (tarea) => tarea.status === "pendiente"
  );
  const tareasEnProgreso = sprint.tareas.filter(
    (tarea) => tarea.status === "en-progreso"
  );
  const tareasCompletadas = sprint.tareas.filter(
    (tarea) => tarea.status === "completada"
  );

  return (
    <>
      <div>
        <Header />
        <div className={styles.mainSprintScreen}>
          <Home />
          <div className={styles.SprintScreenContainer}>
            <div>
              <h3>{sprint.nombre}</h3>
            </div>
            <div className={styles.tareasSprintHeader}>
              <h4>Tareas en el sprint:</h4>
            </div>
            <div className={styles.tareasContainer}>
              <div className={styles.apartado}>
                <h4 className={styles.apartadoTitulo}>Pendientes</h4>
                <div className={styles.tareas}>
                  {tareasPendientes.map((tarea) => (
                    <CardTarea
                      key={tarea.id}
                      tarea={tarea}
                      sprintId={sprint.id}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.apartado}>
                <h4 className={styles.apartadoTitulo}>En Progreso</h4>
                <div className={styles.tareas}>
                  {tareasEnProgreso.map((tarea) => (
                    <CardTarea
                      key={tarea.id}
                      tarea={tarea}
                      sprintId={sprint.id}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.apartado}>
                <h4 className={styles.apartadoTitulo}>Completadas</h4>
                <div className={styles.tareas}>
                  {tareasCompletadas.map((tarea) => (
                    <CardTarea
                      key={tarea.id}
                      tarea={tarea}
                      sprintId={sprint.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
