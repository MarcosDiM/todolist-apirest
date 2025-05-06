export interface ITarea {
  _id: string;
  titulo: string;
  descripcion: string;
  status: string;
  sprint: string;
  fechaLimite: string;
}

export interface ISprint {
  _id: string;
  nombre: string;
  fechaInicio: string;
  fechaCierre: string;
  tareas: ITarea[];
}
