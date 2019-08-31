
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_services/login/login.service';
import { User } from 'src/app/_models/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: any;
  content: any;
  UserLogin: User = new User();

  constructor(private loginService: LoginService) { }

  ngOnInit() {

  };
  onSubmit() {
   /* //console.log("esto: --" + JSON.stringify(this.UserLogin));
    this.UserLoginSend.email = this.UserLogin.email;
    this.UserLoginSend.password = Md5.init(this.UserLogin.password);
    var respuesta = this.loginService.auth(this.UserLogin).subscribe(
      resp => {
        console.log('resp_ ' + JSON.stringify(resp));
      },
      error => {
          console.log('error', 'Damn', 'Something went wrong...');
      },
      () => {
        console.log('success', 'Complete', 'Getting all values complete');
    });*/
  }
  errorAuth(view, message, code){
   /* if(view){
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
    //console.log("this.errorAuth_: " + JSON.stringify(this.errorGeneral_));*/
  }

}
