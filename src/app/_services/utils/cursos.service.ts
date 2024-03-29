import { Cursos } from './../../_models/Cursos';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../_models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/v1/cursos');
  }
  public update(curso: Cursos): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/v1/cursos/actualizar', curso);
  }
  public create(curso: Cursos): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/v1/cursos/crear', curso);
  }

}
