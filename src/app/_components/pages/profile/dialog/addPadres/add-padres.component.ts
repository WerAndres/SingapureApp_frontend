import { Component, OnInit } from '@angular/core';
import { SnackModel } from 'src/app/_models/SnackModel';
import { Usuarios } from 'src/app/_models/Usuarios';
import { SnackBarComponent } from 'src/app/_components/util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { PadresAlumnosService } from 'src/app/_services/utils/padresAlumnos.service';


@Component({
  selector: 'app-add-padres',
  templateUrl: './add-padres.component.html',
  styleUrls: ['../../profile.component.scss']
})
export class AddPadresComponent implements OnInit {
  emailParents = '';
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
  addPadre() {
    if (this.emailParents !== '') {
      this.isLoading = true;
      this.padresAlumnosService.createRelation(this.emailParents, this.userLE.email).subscribe(
        resp => {
          this.isLoading = false;
          this.snack.elements = {};
          this.snack.elements.title = 'Agregar Registro de Padre';
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
      this.snack.elements.title = 'El campo esta vacio';
      this.snack.elements.message = 'por favor ingrese un valor para email';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
}
