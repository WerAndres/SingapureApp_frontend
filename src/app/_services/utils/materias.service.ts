import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../_models/GenericResponse';
import { Materias } from 'src/app/_models/Materias';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/materias');
  }

  public update(data: Materias): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/materias/actualizar', data);
  }

  public create(data: Materias): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/materias/crear', data);
  }

  public getAllFilter(email): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/materias/filter?email=' + email);
  }
}
