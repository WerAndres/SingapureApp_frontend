import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Usuarios } from 'src/app/_models/Usuarios';
import { Md5 } from 'md5-typescript';
import { SnackBarComponent } from '../../util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SnackModel } from 'src/app/_models/SnackModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: any;
  content: any;
  UserLogin: Usuarios = new Usuarios();
  error: any;
  UserLoginSend: Usuarios = new Usuarios();
  isLoading = false;
  snack: SnackModel = new SnackModel();

  constructor(
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
  }
  onSubmit() {
    this.isLoading = true;
    this.UserLoginSend.email = this.UserLogin.email;
    this.UserLoginSend.password = Md5.init(this.UserLogin.password);
    const respuesta = this.authService.login(this.UserLoginSend).subscribe(
      resp => {
        this.isLoading = false;
        this.router.navigate(['/principal']);
      },
      error => {
        this.isLoading = false;
        this.snack.elements = error;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      });
  }
}
