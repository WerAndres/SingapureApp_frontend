
import { Component, OnInit, HostListener, Pipe, PipeTransform, ViewChild, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { CursosService } from 'src/app/_services/utils/cursos.service';
import { MatSnackBar } from '@angular/material';
import { SnackModel } from 'src/app/_models/SnackModel';
import { SnackBarComponent } from '../../util/snack-bar-component/snack-bar.component';
import { DialogComponent } from '../../util/dialog/dialog.component';
import { CrudMateriasComponent } from './dialog/crudMaterias/crudMaterias.component';
import { TableComponent } from '../../util/table-component/table.component';

@Component({
  selector: 'app-academic-management',
  templateUrl: './academicManagement.component.html',
  styleUrls: ['./academicManagement.component.scss']
})
export class AcademicManagementComponent implements OnInit {
  snack: SnackModel = new SnackModel();
  @ViewChild('tablaCursos', {static: false}) tablaCursos: TableComponent;
  isLoading = false;
  cursosArray = [];
  dataSourceCur = new MatTableDataSource();
  configColumnsCur = [];
  isLoadingCur = false;
  generalConfigCur: any;

  constructor(
    private cursosService: CursosService,
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
  clickActionCur(item: any, action: any) {
    console.log('click desde profile: ' + action + ' - ' + JSON.stringify(item));
    if (action === 'edit') {
     this.openEditDialogCur();
    }
    if (action === 'add') {
     this.openCreateDialogCur();
    }
  }
  openEditDialogCur(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: CrudMateriasComponent, title: 'Gestionar cursos'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCursos();
    });
  }
  openCreateDialogCur(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { component: CrudMateriasComponent, title: 'Gestionar cursos'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCursos();
    });
  }

}
