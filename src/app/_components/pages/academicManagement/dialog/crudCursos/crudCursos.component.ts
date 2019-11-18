import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../../util/dialog/dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { SnackModel } from 'src/app/_models/SnackModel';
import { Usuarios } from 'src/app/_models/Usuarios';
import { SnackBarComponent } from 'src/app/_components/util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { CursosService } from 'src/app/_services/utils/cursos.service';
import { Cursos } from 'src/app/_models/Cursos';

@Component({
  selector: 'app-crud-cursos',
  templateUrl: './crudCursos.component.html',
  styleUrls: ['../../academicManagement.component.scss']
})
export class CrudCursosComponent implements OnInit {
  cursoSend: Cursos;
  snack: SnackModel = new SnackModel();
  isLoading = false;
  userLE: Usuarios;
  nombreCurso = '';
  typeCrud = '';
  constructor(
    public snackBar: MatSnackBar,
    private cursosServices: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
    // console.log(JSON.stringify(this.data));
    this.nombreCurso = '';
    // tslint:disable-next-line: no-string-literal
    this.typeCrud = this.data['type'];
    if (this.typeCrud === 'update') {
      // tslint:disable-next-line: no-string-literal
      this.nombreCurso = this.data['item'].curso;
    }
  }
  updateCurso() {
    this.isLoading = true;
    this.cursoSend = new Cursos();
    // tslint:disable-next-line: no-string-literal
    this.cursoSend.idCurso = this.data['item'].id;
    // tslint:disable-next-line: no-string-literal
    this.cursoSend.nombre = this.nombreCurso;
    if (this.cursoSend.nombre !== '') {
      this.cursosServices.update(this.cursoSend).subscribe(
        resp => {
          this.isLoading = false;
          this.snack.elements = {};
          this.snack.elements.title = 'Actualizar curso';
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
      this.snack.elements.message = 'El campo nombre de curso esta vacío';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
  createCurso() {
    this.isLoading = true;
    this.cursoSend = new Cursos();
    this.cursoSend.nombre = this.nombreCurso;
    if (this.cursoSend.nombre !== '') {
      this.cursosServices.create(this.cursoSend).subscribe(
        resp => {
          this.isLoading = false;
          this.snack.elements = {};
          this.nombreCurso = '';
          this.snack.elements.title = 'Crear curso';
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
      this.snack.elements.message = 'El campo nombre de curso esta vacío';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
  clickButton() {
    if (this.typeCrud === 'create') {
      this.createCurso();
    } else if (this.typeCrud === 'update') {
      this.updateCurso();
    }
  }
}
