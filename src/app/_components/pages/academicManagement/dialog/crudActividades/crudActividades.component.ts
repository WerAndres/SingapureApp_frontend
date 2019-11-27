import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../../util/dialog/dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { SnackModel } from 'src/app/_models/SnackModel';
import { Usuarios } from 'src/app/_models/Usuarios';
import { SnackBarComponent } from 'src/app/_components/util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { TemasService } from 'src/app/_services/utils/temas.service';
import { Actividades } from 'src/app/_models/Actividades';
import { ActividadesService } from 'src/app/_services/utils/actividades.service';
import { TiposActividadesService } from 'src/app/_services/utils/tiposActividades.service';
import { Temas } from 'src/app/_models/Temas';
import { TiposActividades } from 'src/app/_models/TiposActividades';


@Component({
  selector: 'app-crud-actividades',
  templateUrl: './crudActividades.component.html',
  styleUrls: ['../../academicManagement.component.scss']
})
export class CrudActividadesComponent implements OnInit {
  actividadSend: Actividades;
  snack: SnackModel = new SnackModel();
  isLoading = false;
  userLE: Usuarios;
  nombreActividad = 'nombreActividad';
  temasArray = [];
  tiposActividadesArray = [];
  temaSelectId: any;
  tipoActividadSelectId: any;
  typeCrud = '';
  urlPrin = '';
  urlSecu = '';
  textoSend = '';
  constructor(
    public snackBar: MatSnackBar,
    private temasServices: TemasService,
    private tiposActividadesService: TiposActividadesService,
    private actividadesServices: ActividadesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
    // console.log(JSON.stringify(this.data));
    this.nombreActividad = '';
    this.getTemas();
    this.getTiposActividades();
    // tslint:disable-next-line: no-string-literal
    this.typeCrud = this.data['type'];
    if (this.typeCrud === 'update') {
      // tslint:disable-next-line: no-string-literal
      this.nombreActividad = this.data['item'].actividad;
      // tslint:disable-next-line: no-string-literal
      this.urlPrin = this.data['item'].urlPrin;
      // tslint:disable-next-line: no-string-literal
      this.urlSecu = this.data['item'].urlSecu;
      // tslint:disable-next-line: no-string-literal
      this.textoSend = this.data['item'].textoSend;
    }
  }
  updateActividad() {
    this.isLoading = true;
    this.actividadSend = new Actividades();
    // tslint:disable-next-line: no-string-literal
    this.actividadSend.idActividad = this.data['item'].id;
    this.actividadSend.tema = new Temas();
    this.actividadSend.tema.idTema = this.temaSelectId;
    this.actividadSend.nombre = this.nombreActividad;
    this.actividadSend.tiposActividades = new TiposActividades();
    this.actividadSend.tiposActividades.idTipoActividad = this.tipoActividadSelectId;
    this.actividadSend.urlPrincipal = this.urlPrin;
    this.actividadSend.urlAlternativa = this.urlSecu;
    this.actividadSend.texto = this.textoSend;
    if (this.actividadSend.nombre !== '' ) {
      if (this.temaSelectId !== null && typeof this.temaSelectId !== 'undefined' && this.temaSelectId !== '') {
        if (this.tipoActividadSelectId !== null && typeof this.tipoActividadSelectId !== 'undefined' && this.tipoActividadSelectId !== '') {
          if (this.actividadSend.urlPrincipal !== '') {
            this.actividadesServices.update(this.actividadSend).subscribe(
              resp => {
                this.isLoading = false;
                this.snack.elements = {};
                this.snack.elements.title = 'Actualizar actividad';
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
            this.snack.elements.message = 'El campo URLPrincipal esta vacío';
            this.snack.type = 'error';
            this.snack.icon = null;
            this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
          }
        } else {
          this.isLoading = false;
          this.snack.elements = {};
          this.snack.elements.title = 'Error - validación';
          this.snack.elements.message = 'El campo Tipo de actividad esta vacío';
          this.snack.type = 'error';
          this.snack.icon = null;
          this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        }
      } else {
        this.isLoading = false;
        this.snack.elements = {};
        this.snack.elements.title = 'Error - validación';
        this.snack.elements.message = 'El campo tema esta vacío';
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      }
    } else {
      this.isLoading = false;
      this.snack.elements = {};
      this.snack.elements.title = 'Error - validación';
      this.snack.elements.message = 'El campo nombre de actividad esta vacío';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
  createActividad() {
    this.isLoading = true;
    this.actividadSend = new Actividades();
    this.actividadSend.tema = new Temas();
    this.actividadSend.tema.idTema = this.temaSelectId;
    this.actividadSend.nombre = this.nombreActividad;
    this.actividadSend.tiposActividades = new TiposActividades();
    this.actividadSend.tiposActividades.idTipoActividad = this.tipoActividadSelectId;
    this.actividadSend.urlPrincipal = this.urlPrin;
    this.actividadSend.urlAlternativa = this.urlSecu;
    this.actividadSend.texto = this.textoSend;
    if (this.actividadSend.nombre !== '' ) {
      if (this.temaSelectId !== null && typeof this.temaSelectId !== 'undefined' && this.temaSelectId !== '') {
        if (this.tipoActividadSelectId !== null && typeof this.tipoActividadSelectId !== 'undefined' && this.tipoActividadSelectId !== '') {
          if (this.actividadSend.urlPrincipal !== '') {
            this.actividadesServices.create(this.actividadSend).subscribe(
              resp => {
                this.isLoading = false;
                this.snack.elements = {};
                this.nombreActividad = '';
                this.temaSelectId = '';
                this.tipoActividadSelectId = '';
                this.urlPrin = '';
                this.urlSecu = '';
                this.textoSend = '';
                this.snack.elements.title = 'Crear actividad';
                this.snack.elements.message = 'Exitoso';
                this.snack.type = 'ok';
                this.snack.icon = null;
                this.temaSelectId = '';
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
            this.snack.elements.message = 'El campo URLPrincipal esta vacío';
            this.snack.type = 'error';
            this.snack.icon = null;
            this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
          }
        } else {
          this.isLoading = false;
          this.snack.elements = {};
          this.snack.elements.title = 'Error - validación';
          this.snack.elements.message = 'El campo Tipo de actividad esta vacío';
          this.snack.type = 'error';
          this.snack.icon = null;
          this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
        }
      } else {
        this.isLoading = false;
        this.snack.elements = {};
        this.snack.elements.title = 'Error - validación';
        this.snack.elements.message = 'El campo tema esta vacío';
        this.snack.type = 'error';
        this.snack.icon = null;
        this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
      }
    } else {
      this.isLoading = false;
      this.snack.elements = {};
      this.snack.elements.title = 'Error - validación';
      this.snack.elements.message = 'El campo nombre de actividad esta vacío';
      this.snack.type = 'error';
      this.snack.icon = null;
      this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
    }
  }
  clickButton() {
    if (this.typeCrud === 'create') {
      this.createActividad();
    } else if (this.typeCrud === 'update') {
      this.updateActividad();
    }
  }
  getTemas() {
    this.isLoading = true;
    this.temasServices.getAll().subscribe(
      resp => {
        this.isLoading = false;
        this.temasArray = resp.bussinesData;
        if (this.typeCrud === 'update') {
          // tslint:disable-next-line: no-string-literal
          this.temaSelectId = this.data['item'].idTema;
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
  getTiposActividades() {
    this.isLoading = true;
    this.tiposActividadesService.getAll().subscribe(
      resp => {
        this.isLoading = false;
        this.tiposActividadesArray = resp.bussinesData;
        if (this.typeCrud === 'update') {
          // tslint:disable-next-line: no-string-literal
          this.tipoActividadSelectId = this.data['item'].idTipoActividad;
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
