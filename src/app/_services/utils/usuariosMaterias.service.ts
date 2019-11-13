import { UsuariosMaterias } from './../../_models/UsuariosMaterias';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../_models/GenericResponse';
import { Materias } from 'src/app/_models/Materias';

@Injectable({
  providedIn: 'root'
})
export class UsuariosMateriasService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/usuarioMateria');
  }

  public getByEmail(email): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/usuarioMateria/filter?email=' + email);
  }

  public getByEmailPadre(email): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/usuarioMateria/filterPadre?email=' + email);
  }

  public createRelation(email: string, idMateria: number): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/usuarioMateria/create', {email, materia: {idMateria}});
  }

  public deleteRelation(idUsuarioMateria: number): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/usuarioMateria/delete', {idUsuarioMateria});
  }
}
