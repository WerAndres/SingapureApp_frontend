import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {
  public server = environment.apiUrl;
  constructor(private http: HttpClient) {}
  public getPrueba(id: any, content: any): Observable<Prueba> {
    return this.http.get<Prueba>(this.server + '/secured/api' + '/prueba/' + id + '/' + content);
  }
  public postPrueba(id: any, content: any): Observable<Prueba> {
    return this.http.post<any>(this.server + '/secured/api' + '/prueba/', {}).pipe(tap(resp => {
      localStorage.setItem('user', JSON.stringify(resp.bussinesData));
      localStorage.setItem('idToken', JSON.stringify(resp.bussinesData.token));
    }));
  }
}
