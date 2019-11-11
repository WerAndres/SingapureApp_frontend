import { SnackBarComponent } from './../../util/snack-bar-component/snack-bar.component';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { SnackModel } from './../../../_models/SnackModel';
import { UsuariosService } from './../../../_services/utils/usuarios.service';
import { Usuarios } from './../../../_models/Usuarios';
import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { TiposUsuarios } from '../../../_models/TiposUsuarios';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosMateriasService } from 'src/app/_services/utils/usuariosMaterias.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProfileDialog } from './profileDialog.component';

export interface MateriasData {
  id: string
  materia: string;
  curso: string;
  actions: [Actions];
}
export interface Actions {
  icon: string;
  name: string;
  click: string;
}

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
  usuarioOld: Usuarios = new Usuarios();
  isLoading: any = false;
  snack: SnackModel = new SnackModel();
  heigthImg: any;
  widthImg: any;
  jsonProfile: any = [];
  userLE: Usuarios;
  displayedColumns: string[] = ['materia', 'curso', 'acciones'];
  materiasArray = [];
  dataSource: MatTableDataSource<MateriasData>;
  isLoadingCourses = false;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  animal: string;
  name: string;

  constructor(
    private usuariosService: UsuariosService,
    private usuariosMateriasService: UsuariosMateriasService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
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
    this.getMaterias();
    this.jsonProfile = [
      { value: this.usuarioSend.nombre , activeEdit: false, nameInput: 'Nombre', key: 'nombre'},
      { value: this.usuarioSend.email , activeEdit: false, nameInput: 'Email', key: 'email'}
    ];
  }
  getMaterias() {
    this.isLoadingCourses = true
    this.usuariosMateriasService.getByEmail(this.usuarioSend.email).subscribe(
      resp => {
        this.isLoadingCourses = false
        resp.bussinesData.forEach(element => {
          this.materiasArray.push({id: element.idUsuarioMateria, materia: element.materia.nombre, curso: element.materia.curso.nombre,
            actions: [
              {icon: 'fas fa-minus-circle', name: 'Eliminar', click: 'delete'},
            ]
          });
        });
        this.dataSource = new MatTableDataSource(this.materiasArray);
      },
      error => {
        this.isLoadingCourses = false
        this.snack.elements = error;
        this.snack.elements.title = null;
        this.snack.elements.message = null;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    });

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
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }
  clickMateria(item, action) {
    console.log('click: ' + action + ' - ' + JSON.stringify(item));
  }
  addMateria(){
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialog, {
      width: '600px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
