import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../../util/constant';

interface myData {
  success: boolean,
  message: string
}

interface registerResponse {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private restUserUrl = Constant.URL_BASE + Constant.GRAPHQL_USER_BASE
  private loggedInStatus = false  
  constructor(
    private http: HttpClient 
  ) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  getCredentials(User): Observable<any> {                  
    //El backend recogerá un parametro json    
    let params = '{ "query":"{credentials(email: \\\"'+User.email+'\\\", password:\\\"'+User.password+'\\\"){name}}"}'; 
    console.log(params);  
    //Establecemos cabeceras
    let headers = new HttpHeaders().set('Content-Type','application/json');             
    return this.http.post(this.restUserUrl, params, {headers: headers});  
  }

}
