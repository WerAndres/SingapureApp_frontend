import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../../util/dialog/dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { SnackModel } from 'src/app/_models/SnackModel';
import { Usuarios } from 'src/app/_models/Usuarios';
import { SnackBarComponent } from 'src/app/_components/util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { MateriasService } from 'src/app/_services/utils/materias.service';
import { Temas } from 'src/app/_models/Temas';
import { TemasService } from 'src/app/_services/utils/temas.service';
import { Materias } from 'src/app/_models/Materias';


@Component({
  selector: 'app-crud-temas',
  templateUrl: './crudTemas.component.html',
  styleUrls: ['../../academicManagement.component.scss']
})
export class CrudTemasComponent implements OnInit {
  temaSend: Temas;
  snack: SnackModel = new SnackModel();
  isLoading = false;
  userLE: Usuarios;
  nombreTema = 'nombreTema';
  materiasArray = [];
  materiaSelectId: any;
  typeCrud = '';
  constructor(
    public snackBar: MatSnackBar,
    private materiasServices: MateriasService,
    private temasServices: TemasService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
    // console.log(JSON.stringify(this.data));
    this.nombreTema = '';
    this.getMaterias();
    // tslint:disable-next-line: no-string-literal
    this.typeCrud = this.data['type'];
    if (this.typeCrud === 'update') {
      // tslint:disable-next-line: no-string-literal
      this.nombreTema = this.data['item'].tema;
    }
  }
  updateTema() {
    this.isLoading = true;
    this.temaSend = new Temas();
    // tslint:disable-next-line: no-string-literal
    this.temaSend.idTema = this.data['item'].id;
    this.temaSend.materia = new Materias();
    // tslint:disable-next-line: no-string-literal
    this.temaSend.materia.idMateria = this.materiaSelectId;
    // tslint:disable-next-line: no-string-literal
    this.temaSend.nombre = this.nombreTema;
    if (this.temaSend.nombre !== '') {
      if (this.materiaSelectId !== null && typeof this.materiaSelectId !== 'undefined' && this.materiaSelectId !== '') {
        this.temasServices.update(this.temaSend).subscribe(
          resp => {
            this.isLoading = false;
            this.snack.elements = {};
            this.snack.elements.title = 'Actulizar tema';
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
        this.snack.elements.message = 'El campo materia esta vacío';
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      }
    } else {
      this.isLoading = false;
      this.snack.elements = {};
      this.snack.elements.title = 'Error - validación';
      this.snack.elements.message = 'El campo nombre de tema esta vacío';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
  createTema() {
    this.isLoading = true;
    this.temaSend = new Temas();
    if (this.typeCrud === 'update') {
      // tslint:disable-next-line: no-string-literal
      this.temaSend.idTema = this.data['item'].id;
    }
    this.temaSend.materia = new Materias();
    // tslint:disable-next-line: no-string-literal
    this.temaSend.materia.idMateria = this.materiaSelectId;
    // tslint:disable-next-line: no-string-literal
    this.temaSend.nombre = this.nombreTema;
    if (this.temaSend.nombre !== '') {
      if (this.materiaSelectId !== null && typeof this.materiaSelectId !== 'undefined' && this.materiaSelectId !== '') {
        this.temasServices.create(this.temaSend).subscribe(
          resp => {
            this.isLoading = false;
            this.snack.elements = {};
            this.nombreTema = '';
            this.snack.elements.title = 'Crear tema';
            this.snack.elements.message = 'Exitoso';
            this.snack.type = 'ok';
            this.snack.icon = null;
            this.materiaSelectId = '';
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
        this.snack.elements.message = 'El campo materia esta vacío';
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      }
    } else {
      this.isLoading = false;
      this.snack.elements = {};
      this.snack.elements.title = 'Error - validación';
      this.snack.elements.message = 'El campo nombre de tema esta vacío';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
  clickButton() {
    if (this.typeCrud === 'create') {
      this.createTema();
    } else if (this.typeCrud === 'update') {
      this.updateTema();
    }
  }
  getMaterias() {
    this.isLoading = true;
    this.materiasServices.getAll().subscribe(
      resp => {
        this.isLoading = false;
        this.materiasArray = resp.bussinesData;
        if (this.typeCrud === 'update') {        // tslint:disable-next-line: no-string-literal
          this.materiaSelectId = this.data['item'].idMateria;
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
