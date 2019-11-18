import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../_models/GenericResponse';
import { Actividades } from 'src/app/_models/Actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/actividades');
  }

  public getAllFilterTema(idTema: any): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/actividades/filterTema?idTema=' + idTema);
  }

  public sendMsg(actividades: Actividades): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/actividades/create', actividades);
  }

  public update(data: Actividades): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/actividades/actualizar', data);
  }

  public create(data: Actividades): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/actividades/crear', data);
  }
}
