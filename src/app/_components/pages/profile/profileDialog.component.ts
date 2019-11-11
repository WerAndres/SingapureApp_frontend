import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SnackModel } from 'src/app/_models/SnackModel';
import { SnackBarComponent } from '../../util/snack-bar-component/snack-bar.component';
import { MateriasService } from 'src/app/_services/utils/materias.service';
import { Usuarios } from 'src/app/_models/Usuarios';

export interface DialogData {
  animal: string;
  name: string;
}

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
  selector: 'app-profile-dialog',
  templateUrl: 'profileDialog.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileDialog implements OnInit {
  displayedColumns: string[] = ['materia', 'curso', 'acciones'];
  materiasArray = [];
  userLE: Usuarios;
  dataSource: MatTableDataSource<MateriasData>;
  isLoadingMat = false;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  animal: string;
  snack: SnackModel = new SnackModel();
  name: string;
  constructor(
    public dialogRef: MatDialogRef<ProfileDialog>,
    private materiasService: MateriasService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
    this.getMaterias(this.userLE !== null ? this.userLE.email : 'email');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getMaterias(email) {
    this.isLoadingMat = true
    this.materiasService.getAllFilter(email).subscribe(
      resp => {
        this.isLoadingMat = false
        resp.bussinesData.forEach(element => {
          this.materiasArray.push({id: element.idMateria, materia: element.nombre, curso: element.curso.nombre,
            actions: [
              {icon: 'fas fa-plus-square', name: 'agregar', click: 'add'},
            ]
          });
        });
        this.dataSource = new MatTableDataSource(this.materiasArray);
      },
      error => {
        this.isLoadingMat = false
        this.snack.elements = error;
        this.snack.elements.title = null;
        this.snack.elements.message = null;
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
}
