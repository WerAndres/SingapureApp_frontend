import { SnackBarComponent } from './../../util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { SnackModel } from './../../../_models/SnackModel';
import { UsuariosService } from './../../../_services/utils/usuarios.service';
import { Usuarios } from './../../../_models/Usuarios';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imageEnc: any;
  imageEncOld: any;
  ram: any;
  actPhoto: any = false;
  usuarioSend: Usuarios = new Usuarios();
  isLoading: any = false;
  snack: SnackModel = new SnackModel();
  heigthImg: any;
  widthImg: any;
  constructor(
    private usuariosService: UsuariosService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.ram = this.getRandomArbitrary(1, 9);
    this.usuarioSend.email = JSON.parse(localStorage.getItem('user')) !== null ? JSON.parse(localStorage.getItem('user')).email : null;
    this.imageEnc = JSON.parse(localStorage.getItem('user')) !== null ?
    (JSON.parse(localStorage.getItem('user')).photo !== null ? JSON.parse(localStorage.getItem('user')).photo : '') : '';
    this.imageEncOld = this.imageEnc;
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  actUser() {
    console.log('actualizando');
    this.usuarioSend.photo = this.imageEnc;
    this.usuariosService.updateUser(this.usuarioSend).subscribe(
      resp => {
        this.imageEncOld = this.imageEnc;
        console.log('Resp: ' + JSON.stringify(resp));
        const userLocal = JSON.parse(localStorage.getItem('user'));
        userLocal.photo = this.imageEnc;
        localStorage.setItem('user', JSON.stringify(userLocal));
        this.isLoading = false;
        this.snack.elements = {};
        this.snack.elements.title = 'Registro';
        this.snack.elements.message = 'Usuario actualizado';
        this.snack.type = 'ok';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      },
      error => {
        this.imageEnc = this.imageEncOld;
        this.isLoading = false;
        this.snack.elements = error;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      });
  }
  onImageLoad(event) {
    const loadedImage = event.currentTarget;
    // tslint:disable-next-line:no-string-literal
    const width = loadedImage['width'];
    // tslint:disable-next-line:no-string-literal
    const height = loadedImage['height'];
    this.heigthImg = height;
    this.widthImg = width;
  }

}
