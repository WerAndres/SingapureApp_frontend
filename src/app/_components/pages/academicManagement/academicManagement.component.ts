
import { Component, OnInit, HostListener, Pipe, PipeTransform, ViewChild, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { CursosService } from 'src/app/_services/utils/cursos.service';
import { MatSnackBar } from '@angular/material';
import { SnackModel } from 'src/app/_models/SnackModel';
import { SnackBarComponent } from '../../util/snack-bar-component/snack-bar.component';
import { DialogComponent } from '../../util/dialog/dialog.component';
import { CrudCursosComponent } from './dialog/crudCursos/crudCursos.component';
import { TableComponent } from '../../util/table-component/table.component';
import { MateriasService } from 'src/app/_services/utils/materias.service';
import { CrudMateriasComponent } from './dialog/crudMaterias/crudMaterias.component';
import { TemasService } from 'src/app/_services/utils/temas.service';
import { CrudTemasComponent } from './dialog/crudTemas/crudTemas.component';

@Component({
  selector: 'app-academic-management',
  templateUrl: './academicManagement.component.html',
  styleUrls: ['./academicManagement.component.scss']
})
export class AcademicManagementComponent implements OnInit {
  snack: SnackModel = new SnackModel();

  @ViewChild('tablaCursos', {static: false}) tablaCursos: TableComponent;
  @ViewChild('tablaMaterias', {static: false}) tablaMaterias: TableComponent;
  @ViewChild('tablaTemas', {static: false}) tablaTemas: TableComponent;

  isLoading = false;

  cursosArray = [];
  dataSourceCur = new MatTableDataSource();
  configColumnsCur = [];
  isLoadingCur = false;
  generalConfigCur: any;

  materiasArray = [];
  dataSourceMat = new MatTableDataSource();
  configColumnsMat = [];
  isLoadingMat = false;
  generalConfigMat: any;

  temasArray = [];
  dataSourceTem = new MatTableDataSource();
  configColumnsTem = [];
  isLoadingTem = false;
  generalConfigTem: any;

  constructor(
    private cursosService: CursosService,
    private materiasService: MateriasService,
    private temasService: TemasService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.configColumnsCur = [
      { value: 'curso' , title: 'Curso', action: false},
      { value: 'acciones' , title: 'Accciones', action: true}
    ];
    this.generalConfigCur = {
      titleAdd: 'Crear curso',
      activeAddItem: true
    };
    this.getCursos();

    this.configColumnsMat = [
      { value: 'materia' , title: 'Materia', action: false},
      { value: 'curso' , title: 'Curso', action: false},
      { value: 'acciones' , title: 'Accciones', action: true}
    ];
    this.generalConfigMat = {
      titleAdd: 'Crear materia',
      activeAddItem: true
    };
    this.getMaterias();

    this.configColumnsTem = [
      { value: 'tema' , title: 'Tema', action: false},
      { value: 'materia' , title: 'Materia', action: false},
      { value: 'curso' , title: 'Curso', action: false},
      { value: 'acciones' , title: 'Accciones', action: true}
    ];
    this.generalConfigTem = {
      titleAdd: 'Crear Tema',
      activeAddItem: true
    };
    this.getTemas();

  }
  getCursos() {
    this.isLoadingCur = true;
    this.dataSourceCur = new MatTableDataSource();
    this.cursosService.getAll().subscribe(
      resp => {
        this.isLoadingCur = false;
        this.cursosArray = [];
        resp.bussinesData.forEach(element => {
          this.cursosArray.push({id: element.idCurso, curso: element.nombre,
            acciones: [
              {icon: 'fas fa-edit', name: 'Editar', click: 'edit', colorClass: 'primary'},
            ]
          });
        });
        this.dataSourceCur.data = this.cursosArray;
        this.tablaCursos.paginatorFun();
      },
      error => {
        this.isLoadingCur = false;
        this.snack.elements = error;
        this.snack.elements.title = null;
        this.snack.elements.message = null;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    });
  }

  getMaterias() {
    this.isLoadingMat = true;
    this.dataSourceMat = new MatTableDataSource();
    this.materiasService.getAll().subscribe(
      resp => {
        this.isLoadingMat = false;
        this.materiasArray = [];
        resp.bussinesData.forEach(element => {
          this.materiasArray.push({id: element.idMateria, materia: element.nombre, idCurso: element.curso.idCurso,
            curso: element.curso.nombre,
            acciones: [
              {icon: 'fas fa-edit', name: 'Editar', click: 'edit', colorClass: 'primary'},
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

  getTemas() {
    this.isLoadingTem = true;
    this.dataSourceTem = new MatTableDataSource();
    this.temasService.getAll().subscribe(
      resp => {
        this.isLoadingTem = false;
        this.temasArray = [];
        resp.bussinesData.forEach(element => {
          this.temasArray.push({id: element.idTema, tema: element.nombre, idMateria: element.materia.idMateria,
            materia: element.materia.nombre, idCurso: element.materia.curso.idCurso,
            curso: element.materia.curso.nombre,
            acciones: [
              {icon: 'fas fa-edit', name: 'Editar', click: 'edit', colorClass: 'primary'},
            ]
          });
        });
        this.dataSourceTem.data = this.temasArray;
        this.tablaTemas.paginatorFun();
      },
      error => {
        this.isLoadingTem = false;
        this.snack.elements = error;
        this.snack.elements.title = null;
        this.snack.elements.message = null;
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    });
  }

  clickActionCur(item: any, action: any) {
    if (action === 'edit') {
     this.openEditDialogCur(item);
    }
    if (action === 'add') {
     this.openCreateDialogCur();
    }
  }
  openEditDialogCur(data: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: CrudCursosComponent, title: 'Gestionar cursos', type: 'update', item: data}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCursos();
    });
  }
  openCreateDialogCur(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: CrudCursosComponent, type: 'create', title: 'Gestionar cursos'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCursos();
    });
  }

  clickActionMat(item: any, action: any) {
    if (action === 'edit') {
     this.openEditDialogMat(item);
    }
    if (action === 'add') {
     this.openCreateDialogMat();
    }
  }
  openEditDialogMat(data: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: CrudMateriasComponent, title: 'Gestionar materias', type: 'update', item: data}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMaterias();
    });
  }
  openCreateDialogMat(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: CrudMateriasComponent, type: 'create', title: 'Gestionar materias'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMaterias();
    });
  }

  clickActionTem(item: any, action: any) {
    if (action === 'edit') {
     this.openEditDialogTem(item);
    }
    if (action === 'add') {
     this.openCreateDialogTem();
    }
  }
  openEditDialogTem(data: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: CrudTemasComponent, title: 'Gestionar temas', type: 'update', item: data}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTemas();
    });
  }
  openCreateDialogTem(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: CrudTemasComponent, type: 'create', title: 'Gestionar temas'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTemas();
    });
  }

}
