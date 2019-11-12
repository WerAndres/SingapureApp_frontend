import { PadresAlumnos } from '../../_models/PadresAlumnos';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../_models/GenericResponse';
import { Materias } from 'src/app/_models/Materias';

@Injectable({
  providedIn: 'root'
})
export class PadresAlumnosService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/padresAlumnos');
  }

  public getByEmail(email, rol): Observable<GenericResponse> {
    if (rol === 'Padre') {
      return this.http.get<GenericResponse>(this.server + '/secured/v1/padresAlumnos/padre?email=' + email);
    } else if (rol === 'Alumno') {
      return this.http.get<GenericResponse>(this.server + '/secured/v1/padresAlumnos/alumno?email=' + email);
    }
  }

  public createRelation(emailPadre: string, emailAlumno: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/padresAlumnos/create',
     {padre: {email: emailPadre}, alumno: {email: emailAlumno}});
  }

  public deleteRelation(idUsuarioMateria: number): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/padresAlumnos/delete', {idUsuarioMateria});
  }
}
