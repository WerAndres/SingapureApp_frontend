
export interface ActionsTable {
  icon: string;
  name: string;
  click: string;
}

export interface MateriasData {
  id: string;
  materia: string;
  curso: string;
  acciones: [ActionsTable];
}


export interface PadresData {
  id: string;
  padre: string;
  acciones: [ActionsTable];
}

export interface AlumnosData {
  id: string;
  alumno: string;
  acciones: [ActionsTable];
}
export interface TemasData {
  id: string;
  tema: string;
  materia: string;
  acciones: [ActionsTable];
}

export interface Activities {
  idActividad: string;
  nombre: string;
}
