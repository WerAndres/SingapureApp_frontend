import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './../../../../util/dialog/dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { SnackModel } from 'src/app/_models/SnackModel';
import { Usuarios } from 'src/app/_models/Usuarios';
import { SnackBarComponent } from 'src/app/_components/util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { CursosService } from 'src/app/_services/utils/cursos.service';
import { Materias } from 'src/app/_models/Materias';
import { MateriasService } from 'src/app/_services/utils/materias.service';
import { Cursos } from 'src/app/_models/Cursos';


@Component({
  selector: 'app-crud-materias',
  templateUrl: './crudMaterias.component.html',
  styleUrls: ['../../academicManagement.component.scss']
})
export class CrudMateriasComponent implements OnInit {
  materiaSend: Materias;
  snack: SnackModel = new SnackModel();
  isLoading = false;
  userLE: Usuarios;
  nombreMateria = 'nombreMateria';
  cursosArray = [];
  cursoSelectId: any;
  typeCrud = '';
  constructor(
    public snackBar: MatSnackBar,
    private cursosServices: CursosService,
    private materiasServices: MateriasService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
    // console.log(JSON.stringify(this.data));
    this.nombreMateria = '';
    this.getCursos();
    // tslint:disable-next-line: no-string-literal
    this.typeCrud = this.data['type'];
    if (this.typeCrud === 'update') {
      // tslint:disable-next-line: no-string-literal
      this.nombreMateria = this.data['item'].materia;
    }
  }
  updateMateria() {
    this.isLoading = true;
    this.materiaSend = new Materias();
    // tslint:disable-next-line: no-string-literal
    this.materiaSend.idMateria = this.data['item'].id;
    this.materiaSend.curso = new Cursos();
    // tslint:disable-next-line: no-string-literal
    this.materiaSend.curso.idCurso = this.cursoSelectId;
    // tslint:disable-next-line: no-string-literal
    this.materiaSend.nombre = this.nombreMateria;
    if (this.materiaSend.nombre !== '') {
      if (this.cursoSelectId !== null && typeof this.cursoSelectId !== 'undefined' && this.cursoSelectId !== '') {
        this.materiasServices.update(this.materiaSend).subscribe(
          resp => {
            this.isLoading = false;
            this.snack.elements = {};
            this.snack.elements.title = 'Actulizar materia';
            this.snack.elements.message = 'Exitoso';
            this.snack.type = 'ok';
            this.snack.icon = null;
            this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
          },
          error => {
            this.isLoading = false;
            this.snack.elements = error;
            this.snack.elements.title = null;
            this.snack.elements.message = null;
            this.snack.type = 'error';
            this.snack.icon = null;
            this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        });
      } else {
        this.isLoading = false;
        this.snack.elements = {};
        this.snack.elements.title = 'Error - validación';
        this.snack.elements.message = 'El campo curso esta vacío';
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      }
    } else {
      this.isLoading = false;
      this.snack.elements = {};
      this.snack.elements.title = 'Error - validación';
      this.snack.elements.message = 'El campo nombre de materia esta vacío';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
  createMateria() {
    this.isLoading = true;
    this.materiaSend = new Materias();
    // tslint:disable-next-line: no-string-literal
    if (this.typeCrud === 'update') {
      this.materiaSend.idMateria = this.data['item'].id;
    }
    this.materiaSend.curso = new Cursos();
    // tslint:disable-next-line: no-string-literal
    this.materiaSend.curso.idCurso = this.cursoSelectId;
    // tslint:disable-next-line: no-string-literal
    this.materiaSend.nombre = this.nombreMateria;
    if (this.materiaSend.nombre !== '') {
      if (this.cursoSelectId !== null && typeof this.cursoSelectId !== 'undefined' && this.cursoSelectId !== '') {
        this.materiasServices.create(this.materiaSend).subscribe(
          resp => {
            this.isLoading = false;
            this.snack.elements = {};
            this.nombreMateria = '';
            this.snack.elements.title = 'Crear materia';
            this.snack.elements.message = 'Exitoso';
            this.snack.type = 'ok';
            this.snack.icon = null;
            this.cursoSelectId = '';
            this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
          },
          error => {
            this.isLoading = false;
            this.snack.elements = error;
            this.snack.elements.title = null;
            this.snack.elements.message = null;
            this.snack.type = 'error';
            this.snack.icon = null;
            this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        });
      } else {
        this.isLoading = false;
        this.snack.elements = {};
        this.snack.elements.title = 'Error - validación';
        this.snack.elements.message = 'El campo curso esta vacío';
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      }
    } else {
      this.isLoading = false;
      this.snack.elements = {};
      this.snack.elements.title = 'Error - validación';
      this.snack.elements.message = 'El campo nombre de materia esta vacío';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
  clickButton() {
    if (this.typeCrud === 'create') {
      this.createMateria();
    } else if (this.typeCrud === 'update') {
      this.updateMateria();
    }
  }
  getCursos() {
    this.isLoading = true;
    this.cursosServices.getAll().subscribe(
      resp => {
        this.isLoading = false;
        this.cursosArray = resp.bussinesData;
        if (this.typeCrud === 'update') {        // tslint:disable-next-line: no-string-literal
          this.cursoSelectId = this.data['item'].idCurso;
        }
      },
      error => {
        this.isLoading = false;
        this.snack.elements = error;
        this.snack.elements.title = null;
        this.snack.elements.message = null;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    });
  }
}
