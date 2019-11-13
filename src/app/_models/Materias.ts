import { Cursos } from './Cursos';
import { PadresAlumnos } from './PadresAlumnos';

export class Materias {
  idMateria: any;
  fechaCreacion: any;
  fechaActualizacion: any;
  nombre: any;
  curso: Cursos;
  usuariosAlumnos: PadresAlumnos[];
}
