import { GenericResponse } from './../../../../.history/src/app/_models/GenericResponse_20190803080945';
import { User } from './../../_models/User';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}
  public auth(userParam: User): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/login', userParam).pipe(tap(resp => {
      localStorage.setItem('user', JSON.stringify(resp.bussinesData));
    }));
  }
  public logout() {
    localStorage.removeItem('user');
  }
  public get loggedIn(): boolean {
    return JSON.parse(localStorage.getItem('user')).token !==  null;
  }
}
