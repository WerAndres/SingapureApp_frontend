
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { User } from 'src/app/_models/User';
import { ErrorGeneral } from '../../../_models/Error';
import { Md5 } from 'md5-typescript';
import { SnackBarComponent } from '../../util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SnackModel } from 'src/app/_models/SnackModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  id: any;
  content: any;
  UserRegister: User = new User();
  UserRegisterSend: User = new User();
  confirmPassword: string;
  confirmPassErrorEquals = false;
  isLoading = false;
  snack: SnackModel = new SnackModel();
  
  constructor(
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit() {
  }
  onKey(event: any) { // without type info
    if (this.UserRegister.password !== '' && this.confirmPassword !== '') {
      if (this.UserRegister.password !== this.confirmPassword) {
        this.confirmPassErrorEquals = true;
      } else {
        this.confirmPassErrorEquals = false;
      }
    } else {
      this.confirmPassErrorEquals = false;
    }
  }
  onSubmit() {
    console.log('esto: --' + JSON.stringify(this.UserRegister));
    this.isLoading = true;
    this.UserRegisterSend.email = this.UserRegister.email;
    this.UserRegisterSend.name = this.UserRegister.name;
    this.UserRegisterSend.password = Md5.init(this.UserRegister.password);
    const respuesta = this.authService.createUser(this.UserRegisterSend).subscribe(
      resp => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error => {
        this.snack.elements = error;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        this.isLoading = false;
      });
  }

}
