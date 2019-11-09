import { Usuarios } from '../../_models/Usuarios';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../_models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public updateUser(usuario: Usuarios): Observable<GenericResponse> {
    return this.http.put<GenericResponse>(this.server + '/v1/usuarios', usuario);
  }
}
