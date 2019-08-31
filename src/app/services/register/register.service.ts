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
export class RegisterService {

  private restUserUrl = Constant.URL_BASE + Constant.GRAPHQL_USER_BASE
  private loggedInStatus = false  
  constructor(
    private http: HttpClient 
  ) { }

  createUser(User): Observable<any> {    
    //El backend recogerá un parametro json    
    //console.log("User: ---- " + JSON.stringify(User))    
    let params = '{ \"query\": \"mutation {createUser(email:\\\"'+User.email+'\\\", name:\\\"'+User.name+'\\\",password: \\\"'+User.password+'\\\"){name}}\"}'; 
    console.log(params);  
    //Establecemos cabeceras
    let headers = new HttpHeaders().set('Content-Type','application/json');             
    return this.http.post(this.restUserUrl, params, {headers: headers});  
  }


}
