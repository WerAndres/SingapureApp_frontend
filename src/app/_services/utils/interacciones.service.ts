import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../_models/GenericResponse';
import { Interacciones } from 'src/app/_models/Interacciones';

@Injectable({
  providedIn: 'root'
})
export class InteraccionesService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/interacciones');
  }

  public getAllFilterTema(idTema: any): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/interacciones/filterTema?idTema=' + idTema);
  }

  public sendMsg(interacciones: Interacciones): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/interacciones/create', interacciones);
  }
}
