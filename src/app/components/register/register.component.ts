import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { User } from '../../models/UserType';
import { MatSnackBar } from '@angular/material';
import { RegisterService } from '../../services/register/register.service';
import { errorGeneral } from '../../util/interfaces';
import { Md5 } from "md5-typescript";
import { SnackBarComponent } from '../../util/snack-bar-component/snack-bar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  UserRegister: User;
  UserRegisterSend: User;  
  errorGeneral_: errorGeneral;
  confirmPassword: String;
  confirmPassErrorEquals: boolean = false;
  registerPrincipalVar: boolean = true;
  registerUserVar: boolean = false;
  registerWorkShopVar: boolean = false;

  constructor(
    private http: HttpClient, 
    private router:Router,    
    public snackBar: MatSnackBar,
    private Register: RegisterService          
  ) { 
    this.UserRegister = new User();
    this.UserRegisterSend = new User();
  }

  ngOnInit() {
  }
 
  onKey(event: any) { // without type info
    if(this.UserRegister.password != "" && this.confirmPassword != ""){
      if(this.UserRegister.password != this.confirmPassword){
        this.confirmPassErrorEquals = true;
      }else{
        this.confirmPassErrorEquals = false;
      }
    }else{
      this.confirmPassErrorEquals = false;
    }   
  }

  registerUserButton (event: any){
    this.registerPrincipalVar = false;
    this.registerUserVar = true;
    this.registerWorkShopVar = false;
  }

  registerWorkShopButton (event: any){
    this.registerPrincipalVar = false;
    this.registerUserVar = false;
    this.registerWorkShopVar = true;
  }

  cancelRegisterUser (event: any){
    this.registerPrincipalVar = true;
    this.registerUserVar = false;
    this.registerWorkShopVar = false;
  }

  //Metodos
  onSubmit() {    
    //console.log("esto: --" + JSON.stringify(this.UserRegister));        
    this.UserRegisterSend.email = this.UserRegister.email;
    this.UserRegisterSend.name = this.UserRegister.name;
    this.UserRegisterSend.password = Md5.init(this.UserRegister.password); 
    //console.log("this.confirmPassword: "+ this.confirmPassword);
    //console.log("this.UserRegister.password: "+ this.UserRegister.password);    

    var respuesta = this.Register.createUser(this.UserRegisterSend).subscribe(
    data => {
      console.log("data: " +JSON.stringify(data));
      console.log("data.data.createUser: " +JSON.stringify(data.data.createUser));
        
        if(data != null && data.data.createUser != null){
          this.router.navigate(['/dashboard']); 
        }else{
          let res = JSON.parse(data.errors[0].message);
          console.log("res: " + res);          
          console.log("res.code: " + res.code);          
          console.log("res.message: " + res.message);          
          this.errorRegister(true, res.message, res.code);
        }
      },
      err => {
        this.errorRegister(true, err, 9999);
      }
    );     
  }

  errorRegister(view, message, code){
    if(view){
      this.errorGeneral_.view = true;
      this.errorGeneral_.code = code;
      this.errorGeneral_.message = message;
      console.log("sanck: " +JSON.stringify({data: this.errorGeneral_}));
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.errorGeneral_});

    }else{
      this.errorGeneral_.view = false;
      this.errorGeneral_.code = 0;
      this.errorGeneral_.message = "";
    }
    console.log("this.errorRegister_: " + JSON.stringify(this.errorGeneral_));
  }
}