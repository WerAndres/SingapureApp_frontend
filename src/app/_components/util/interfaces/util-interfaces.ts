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
