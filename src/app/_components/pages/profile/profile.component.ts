import { SnackBarComponent } from './../../util/snack-bar-component/snack-bar.component';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { SnackModel } from './../../../_models/SnackModel';
import { UsuariosService } from './../../../_services/utils/usuarios.service';
import { Usuarios } from './../../../_models/Usuarios';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TiposUsuarios } from '../../../_models/TiposUsuarios';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  imageEnc: any;
  imageEncOld: any;
  ram: any;
  actPhoto: any = false;
  usuarioSendImage: Usuarios = new Usuarios();
  usuarioSend: Usuarios = new Usuarios();
  usuarioOld: Usuarios = new Usuarios();
  isLoading: any = false;
  snack: SnackModel = new SnackModel();
  heigthImg: any;
  widthImg: any;
  jsonProfile: any = [];
  userLE: Usuarios;
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private usuariosService: UsuariosService,
    public snackBar: MatSnackBar
  ) {
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }
  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
    this.ram = this.getRandomArbitrary(1, 9);
    this.usuarioSendImage.email = this.userLE !== null ? this.userLE.email : null;
    this.imageEnc = this.userLE !== null ? (this.userLE.photo !== null ?this.userLE.photo : '') : '';
    this.usuarioSend.nombre = this.userLE !== null ? this.userLE.nombre : 'Usuario';
    this.usuarioSend.email = this.userLE !== null ? this.userLE.email : 'email';
    this.usuarioSend.tipoUsuario = this.userLE !== null ? this.userLE.tipoUsuario : new TiposUsuarios();
    this.usuarioSend.keyEmail = this.usuarioSend.email;
    this.usuarioSendImage.keyEmail = this.usuarioSendImage.email;
    this.imageEncOld = this.imageEnc;
    this.usuarioOld = JSON.parse(JSON.stringify(this.usuarioSend));
    this.jsonProfile = [
      { value: this.usuarioSend.nombre , activeEdit: false, nameInput: 'Nombre', key: 'nombre'},
      { value: this.usuarioSend.email , activeEdit: false, nameInput: 'Email', key: 'email'}
    ];
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  actUser() {
    this.isLoading = true;
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
    if (typeof this.imageEnc !== 'undefined' && this.imageEnc !== null) {
      const loadedImage = event.currentTarget;
      // tslint:disable-next-line:no-string-literal
      const width = loadedImage['width'];
      // tslint:disable-next-line:no-string-literal
      const height = loadedImage['height'];
      this.heigthImg = height;
      this.widthImg = width;
    }
  }
  clickActivated(elem) {
    this.jsonProfile.forEach(element => {
      element.activeEdit = false;
    });
    elem.activeEdit = true;
  }
  cancelActivated(elem) {
    elem.activeEdit = false;
    elem.value = this.usuarioOld[elem.key]
  }
  saveUsuario(elem){
    elem.activeEdit = false;
    this.isLoading = true;
    this.usuarioSend[elem.key] = elem.value;
    this.usuariosService.updateUser(this.usuarioSend).subscribe(
      resp => {
        console.log('Resp: ' + JSON.stringify(resp));
        const userLocal = JSON.parse(localStorage.getItem('user'));
        userLocal[elem.key] = elem.value;
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  paginatorFun() {
    console.log("aaaaaaaa");
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }
}
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
