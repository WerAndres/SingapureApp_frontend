import { SnackBarComponent } from './../../util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { SnackModel } from './../../../_models/SnackModel';
import { UsuariosService } from './../../../_services/utils/usuarios.service';
import { Usuarios } from './../../../_models/Usuarios';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposUsuarios } from '../../../_models/TiposUsuarios';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosMateriasService } from 'src/app/_services/utils/usuariosMaterias.service';
import { MatDialog } from '@angular/material/dialog';
import { MateriasData, PadresData, AlumnosData } from '../../util/interfaces/util-interfaces';
import { DialogComponent } from '../../util/dialog/dialog.component';
import { AddMateriasComponent } from './dialog/addMaterias/add-materias.component';
import { PadresAlumnosService } from 'src/app/_services/utils/padresAlumnos.service';
import { AddPadresComponent } from './dialog/addPadres/add-padres.component';
import { AddAlumnosComponent } from './dialog/addAlumnos/add-alumnos.component';
import { TableComponent } from '../../util/table-component/table.component';

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
  materiasArray = [];
  padresArray = [];
  alumnosArray = [];
  dataSourceMat = new MatTableDataSource();
  dataSourcePad = new MatTableDataSource();
  dataSourceAlu = new MatTableDataSource();
  @ViewChild('tablaMaterias', {static: false}) tablaMaterias: TableComponent;
  @ViewChild('tablaPadres', {static: false}) tablaPadres: TableComponent;
  @ViewChild('tablaAlumnos', {static: false}) tablaAlumnos: TableComponent;
  configColumnsMat = [];
  configColumnsPad = [];
  configColumnsAlu = [];
  isLoadingMat = false;
  isLoadingPad = false;
  isLoadingAlu = false;
  generalConfigMat: any;
  generalConfigPad: any;
  generalConfigAlu: any;
  constructor(
    private usuariosService: UsuariosService,
    private usuariosMateriasService: UsuariosMateriasService,
    private padresAlumnosService: PadresAlumnosService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
    this.ram = this.getRandomArbitrary(1, 9);
    this.usuarioSendImage.email = this.userLE !== null ? this.userLE.email : null;
    this.imageEnc = (this.userLE !== null && typeof this.userLE !== 'undefined') ?
    ((this.userLE.photo !== null && typeof this.userLE.photo !== 'undefined')
    ? this.userLE.photo : '') : '';
    this.usuarioSend.nombre = this.userLE !== null ? this.userLE.nombre : 'Usuario';
    this.usuarioSend.email = this.userLE !== null ? this.userLE.email : 'email';
    this.usuarioSend.tipoUsuario = this.userLE !== null ? this.userLE.tipoUsuario : new TiposUsuarios();
    this.usuarioSend.keyEmail = this.usuarioSend.email;
    this.usuarioSendImage.keyEmail = this.usuarioSendImage.email;
    this.imageEncOld = this.imageEnc;
    this.usuarioOld = JSON.parse(JSON.stringify(this.usuarioSend));
    this.getMaterias();
    this.getPadres();
    this.getAlumnos();
    this.jsonProfile = [
      { value: this.usuarioSend.nombre , activeEdit: false, nameInput: 'Nombre', key: 'nombre'},
      { value: this.usuarioSend.email , activeEdit: false, nameInput: 'Email', key: 'email'}
    ];
    this.configColumnsMat = [
      { value: 'materia' , title: 'Materia', action: false},
      { value: 'curso' , title: 'Curso', action: false},
      { value: 'acciones' , title: 'Accciones', action: true}
    ];
    this.configColumnsPad = [
      { value: 'padre' , title: 'Padre', action: false},
      { value: 'acciones' , title: 'Accciones', action: true}
    ];
    this.configColumnsAlu = [
      { value: 'alumno' , title: 'Alumno', action: false},
      { value: 'acciones' , title: 'Accciones', action: true}
    ];
    this.generalConfigMat = {
      titleAdd: 'Agregar materia',
      activeAddItem: true
    };
    this.generalConfigPad = {
      titleAdd: 'Asociar padre',
      activeAddItem: true
    };
    this.generalConfigAlu = {
      titleAdd: 'Asociar alumno',
      activeAddItem: true
    };
  }
  getMaterias() {
    const rol = this.userLE.tipoUsuario.nombre;
    if (rol === 'Alumno' || rol === 'Profesor') {
      this.isLoadingMat = true;
      this.dataSourceMat = new MatTableDataSource();
      this.usuariosMateriasService.getByEmail(this.usuarioSend.email).subscribe(
        resp => {
          this.isLoadingMat = false;
          this.materiasArray = [];
          resp.bussinesData.forEach(element => {
            this.materiasArray.push({id: element.idUsuarioMateria, materia: element.materia.nombre, curso: element.materia.curso.nombre,
              acciones: [
                {icon: 'fas fa-minus-circle', name: 'Eliminar', click: 'delete', colorClass: 'accent'},
              ]
            });
          });
          this.dataSourceMat.data = this.materiasArray;
          this.tablaMaterias.paginatorFun();
        },
        error => {
          this.isLoadingMat = false;
          this.snack.elements = error;
          this.snack.elements.title = null;
          this.snack.elements.message = null;
          this.snack.type = 'error';
          this.snack.icon = null;
          this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      });
    }
  }
  getPadres() {
    const rol = this.userLE.tipoUsuario.nombre;
    if (rol === 'Alumno') {
      this.isLoadingPad = true;
      this.dataSourcePad = new MatTableDataSource();
      this.padresAlumnosService.getByEmail(this.userLE.email, rol).subscribe(
        resp => {
          this.isLoadingPad = false;
          this.padresArray = [];
          resp.bussinesData.forEach(element => {
            this.padresArray.push({id: element.idPadreAlumno, padre: element.padre.nombre,
              acciones: [
                {icon: 'fas fa-minus-circle', name: 'Eliminar', click: 'delete', colorClass: 'accent'},
              ]
            });
          });
          this.dataSourcePad.data = this.padresArray;
          this.tablaPadres.paginatorFun();
        },
        error => {
          this.isLoadingPad = false;
          this.snack.elements = error;
          this.snack.elements.title = null;
          this.snack.elements.message = null;
          this.snack.type = 'error';
          this.snack.icon = null;
          this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      });
    }
  }
  getAlumnos() {
    const rol = this.userLE.tipoUsuario.nombre;
    if (rol === 'Padre') {
      this.isLoadingAlu = true;
      this.dataSourceAlu = new MatTableDataSource();
      this.padresAlumnosService.getByEmail(this.userLE.email, rol).subscribe(
        resp => {
          this.isLoadingAlu = false;
          this.alumnosArray = [];
          resp.bussinesData.forEach(element => {
            this.alumnosArray.push({id: element.idPadreAlumno, alumno: element.alumno.nombre,
              acciones: [
                {icon: 'fas fa-minus-circle', name: 'Eliminar', click: 'delete', colorClass: 'accent'},
              ]
            });
          });
          this.dataSourceAlu.data = this.alumnosArray;
          this.tablaAlumnos.paginatorFun();
        },
        error => {
          this.isLoadingAlu = false;
          this.snack.elements = error;
          this.snack.elements.title = null;
          this.snack.elements.message = null;
          this.snack.type = 'error';
          this.snack.icon = null;
          this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      });
    }
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
  cancelActivated(elem: any) {
    elem.activeEdit = false;
    elem.value = this.usuarioOld[elem.key];
  }
  saveUsuario(elem: any) {
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
  openDialogMat(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: AddMateriasComponent, title: 'Agregar materias'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMaterias();
    });
  }
  openDialogPad(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: AddPadresComponent, title: 'Asociar padres'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPadres();
    });
  }
  openDialogAlu(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: AddAlumnosComponent, title: 'Asociar alumnos'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAlumnos();
    });
  }
  clickActionMat(item: any, action: any) {
    // console.log('click desde profile: ' + action + ' - ' + JSON.stringify(item));
    if (action === 'add') {
      this.openDialogMat();
    }
    if (action === 'delete') {
      this.deleteRelationUsuMat(item);
    }
  }
  clickActionPad(item: any, action: any) {
    // console.log('click desde profile: ' + action + ' - ' + JSON.stringify(item));
    if (action === 'add') {
      this.openDialogPad();
    }
    if (action === 'delete') {
      this.deleteRelationPadAlum(item);
    }
  }
  clickActionAlu(item: any, action: any) {
    // console.log('click desde profile: ' + action + ' - ' + JSON.stringify(item));
    if (action === 'add') {
      this.openDialogAlu();
    }
    if (action === 'delete') {
      this.deleteRelationPadAlum(item);
    }
  }
  deleteRelationUsuMat(item) {
    this.isLoadingMat = true;
    this.usuariosMateriasService.deleteRelation(item.id).subscribe(
      resp => {
        this.isLoadingMat = false;
        this.snack.elements = {};
        this.snack.elements.title = 'Borrar Registro';
        this.snack.elements.message = 'Exitoso';
        this.snack.type = 'ok';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        this.getMaterias();
      },
      error => {
        this.isLoadingMat = false;
        this.snack.elements = error;
        this.snack.elements.title = null;
        this.snack.elements.message = null;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    });
  }
  deleteRelationPadAlum(item) {
    this.isLoadingMat = true;
    this.padresAlumnosService.deleteRelation(item.id).subscribe(
      resp => {
        this.isLoadingMat = false;
        this.snack.elements = {};
        this.snack.elements.title = 'Borrar Registro';
        this.snack.elements.message = 'Exitoso';
        this.snack.type = 'ok';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        const rol = this.userLE.tipoUsuario.nombre;
        if (rol === 'Alumno') {
          this.getPadres();
        } else if (rol === 'Padre') {
          this.getAlumnos();
        }
      },
      error => {
        this.isLoadingMat = false;
        this.snack.elements = error;
        this.snack.elements.title = null;
        this.snack.elements.message = null;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    });
  }
}
