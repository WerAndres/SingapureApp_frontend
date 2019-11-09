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
  usuarioSendImage: Usuarios = new Usuarios();
  usuarioSend: Usuarios = new Usuarios();
  isLoading: any = false;
  snack: SnackModel = new SnackModel();
  heigthImg: any;
  widthImg: any;
  jsonProfile: any = [];
  userLE: Usuarios;
  constructor(
    private usuariosService: UsuariosService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
    this.ram = this.getRandomArbitrary(1, 9);
    this.usuarioSendImage.email = this.userLE !== null ? this.userLE.email : null;
    this.imageEnc = this.userLE !== null ? (this.userLE.photo !== null ?this.userLE.photo : '') : '';
    this.usuarioSend.nombre = this.userLE !== null ? this.userLE.nombre : 'Usuario';
    this.usuarioSend.email = this.userLE !== null ? this.userLE.email : 'email';
    this.imageEncOld = this.imageEnc;
    this.jsonProfile = [
      { value: this.usuarioSend.nombre , activeEdit: false},
      { value: this.usuarioSend.email , activeEdit: false}
    ];
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  actUser() {
    console.log('actualizando');
    this.usuarioSendImage.photo = this.imageEnc;
    this.usuariosService.updateUser(this.usuarioSendImage).subscribe(
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
  clickActivated(elem) {
    this.jsonProfile.forEach(element => {
      element.activeEdit = false;
    });
    elem.activeEdit = true;
  }
  cancelActivated(elem) {
    elem.activeEdit = false;
  }

}
