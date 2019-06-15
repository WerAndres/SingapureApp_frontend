import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {
  public server = environment.apiUrl;
  constructor(private http: HttpClient) {}
  public getPrueba(id: any, content: any): Observable<Prueba> {
    return this.http.get<Prueba>(this.server + '/prueba/' + id + '/' + content);
  }
}
