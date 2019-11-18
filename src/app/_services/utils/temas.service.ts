import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../_models/GenericResponse';
import { Temas } from 'src/app/_models/Temas';

@Injectable({
  providedIn: 'root'
})
export class TemasService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/temas');
  }

  public getAllFilter(email): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.server + '/secured/v1/temas/filter?email=' + email);
  }

  public update(data: Temas): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/temas/actualizar', data);
  }

  public create(data: Temas): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/secured/v1/temas/crear', data);
  }

}
