import { Component, OnInit } from '@angular/core';
import { SnackModel } from 'src/app/_models/SnackModel';
import { Usuarios } from 'src/app/_models/Usuarios';
import { SnackBarComponent } from 'src/app/_components/util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { PadresAlumnosService } from 'src/app/_services/utils/padresAlumnos.service';


@Component({
  selector: 'app-add-alumnos',
  templateUrl: './add-alumnos.component.html',
  styleUrls: ['../../profile.component.scss']
})
export class AddAlumnosComponent implements OnInit {
  emailStudent = '';
  snack: SnackModel = new SnackModel();
  isLoading = false;
  userLE: Usuarios;
  constructor(
    public snackBar: MatSnackBar,
    private padresAlumnosService: PadresAlumnosService
  ) {}

  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
  }
  addAlumno() {
    if (this.emailStudent !== '') {
      this.isLoading = true;
      this.padresAlumnosService.createRelation(this.userLE.email, this.emailStudent).subscribe(
        resp => {
          this.isLoading = false;
          this.snack.elements = {};
          this.snack.elements.title = 'Agregar Registro de Alumno';
          this.snack.elements.message = 'Exitoso';
          this.snack.type = 'ok';
          this.snack.icon = null;
          this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
          this.emailStudent = '';
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
      this.snack.elements.title = 'El campo esta vacio';
      this.snack.elements.message = 'por favor ingrese un valor para email';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
}
