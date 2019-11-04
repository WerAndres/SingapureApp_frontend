import { TiposUsuarios } from './../../../_models/TiposUsuarios';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { TiposUsuariosService } from 'src/app/_services/utils/tiposUsuarios.service';
import { Usuarios } from 'src/app/_models/Usuarios';
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
  userRegister: Usuarios = new Usuarios();
  userRegisterSend: Usuarios = new Usuarios();
  tipoUsuario: TiposUsuarios = new TiposUsuarios();
  confirmPassword: string;
  confirmPassErrorEquals = false;
  isLoading = false;
  snack: SnackModel = new SnackModel();
  tiposUsuariosSelect: TiposUsuarios[] = [];

  constructor(
    private authService: AuthService,
    private tiposUsuariosService: TiposUsuariosService,
    public snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit() {
    this.tiposUsuariosService.getAll().subscribe(
      resp => {
        this.tiposUsuariosSelect = resp.bussinesData;
      },
      error => {
        this.snack.elements = error;
        this.snack.elements.title = null;
        this.snack.elements.message = null;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        this.isLoading = false;
    });
  }
  onKey(event: any) { // without type info
    if (this.userRegister.password !== '' && this.confirmPassword !== '') {
      if (this.userRegister.password !== this.confirmPassword) {
        this.confirmPassErrorEquals = true;
      } else {
        this.confirmPassErrorEquals = false;
      }
    } else {
      this.confirmPassErrorEquals = false;
    }
  }
  onSubmit() {
    this.isLoading = true;
    this.userRegisterSend.email = this.userRegister.email;
    this.userRegisterSend.nombre = this.userRegister.nombre;
    this.userRegisterSend.tipoUsuario = this.tipoUsuario;
    this.userRegisterSend.password = Md5.init(this.userRegister.password);
    const respuesta = this.authService.createUser(this.userRegisterSend).subscribe(
      resp => {
        this.isLoading = false;
        this.snack.elements = {};
        this.snack.elements.title = 'Registro';
        this.snack.elements.message = 'Usuario creado - ' + this.userRegisterSend.nombre.split(' ')[0];
        this.snack.type = 'ok';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        this.router.navigate(['/login']);
      },
      error => {
        this.snack.elements = error;
        this.snack.elements.title = null;
        this.snack.elements.message = null;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        this.isLoading = false;
      });
  }

}
