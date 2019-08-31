import { Component, OnInit, Inject} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../../models/UserType'; 
import { Router } from '@angular/router';
import { errorGeneral } from '../../util/interfaces';
import { SnackBarComponent } from '../../util/snack-bar-component/snack-bar.component';
import { AuthService } from '../../services/auth/auth.service'
import { MatSnackBar } from '@angular/material';
import { Md5 } from "md5-typescript";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  errorGeneral_: errorGeneral;
  UserLogin: User;
  UserLoginSend: User;  

  constructor( 
    private http: HttpClient, 
    private router:Router, 
    private Auth: AuthService,     
    public snackBar: MatSnackBar
  ) {
    this.UserLogin = new User();
    this.UserLoginSend = new User();      
    this.errorGeneral_ = {
      view: false,
      code: 0,
      message: ""
    };
  }
  ngOnInit() {
    
  };
  
  //Metodos
  onSubmit() {    
    //console.log("esto: --" + JSON.stringify(this.UserLogin));        
    this.UserLoginSend.email = this.UserLogin.email;
    this.UserLoginSend.password = Md5.init(this.UserLogin.password); 
    var respuesta = this.Auth.getCredentials(this.UserLoginSend).subscribe(
      data => {
        //console.log("data: " +JSON.stringify(data));
        if(data != null && data.data.credentials != null){
          this.router.navigate(['/dashboard']); 
        }else{
          let res = JSON.parse(data.errors[0].message);
          //console.log("res: " + res);          
          //console.log("res.code: " + res.code);          
          //console.log("res.message: " + res.message);          
          this.errorAuth(true, res.message, res.code);
        }
      },
      err => {
        this.errorAuth(true, err, 9999);
      }
    );     
  }

  errorAuth(view, message, code){
    if(view){
      this.errorGeneral_.view = true;
      this.errorGeneral_.code = code;
      this.errorGeneral_.message = message;
      //console.log("sanck: " +JSON.stringify({data: this.errorGeneral_}));
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.errorGeneral_});

    }else{
      this.errorGeneral_.view = false;
      this.errorGeneral_.code = 0;
      this.errorGeneral_.message = "";
    }
    //console.log("this.errorAuth_: " + JSON.stringify(this.errorGeneral_));
  }
} 
