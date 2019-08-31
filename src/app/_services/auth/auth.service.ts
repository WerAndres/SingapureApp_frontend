import { User } from '../../_models/User';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenericResponse } from '../../_models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server = environment.apiUrl;
  constructor(private http: HttpClient) {}
  public login(userParam: User): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/auth', userParam).pipe(tap(resp => {
      localStorage.setItem('user', JSON.stringify(resp.bussinesData));
      localStorage.setItem('idToken', JSON.stringify(resp.bussinesData.token));
    }));
  }
  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('idToken');
  }
  public loggedIn(): boolean {
    return localStorage.getItem('idToken') !==  null;
  }
  public createUser(userParam: User): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.server + '/auth/create', userParam);
  }
}
