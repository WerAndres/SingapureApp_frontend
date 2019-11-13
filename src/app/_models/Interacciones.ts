import { Temas } from './Temas';
import { Usuarios } from './Usuarios';

export class Interacciones {
  idInteraccion: any;
  fechaCreacion: any;
  fechaActualizacion: any;
  tema: Temas;
  usuario: Usuarios;
  mensaje: string;
  email: string;
}
