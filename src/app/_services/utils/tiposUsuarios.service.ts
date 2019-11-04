import { Usuarios } from '../../_models/Usuarios';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenericResponse } from '../../_models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class TiposUsuariosService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/v1/tipos_usuarios');
  }
}
