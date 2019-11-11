import { UsuariosMateriasService } from './../../../../../_services/utils/usuariosMaterias.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { SnackModel } from 'src/app/_models/SnackModel';
import { MateriasService } from 'src/app/_services/utils/materias.service';
import { Usuarios } from 'src/app/_models/Usuarios';
import { MateriasData } from 'src/app/_components/util/interfaces/util-interfaces';
import { SnackBarComponent } from 'src/app/_components/util/snack-bar-component/snack-bar.component';
import { Materias } from 'src/app/_models/Materias';
import { UsuariosMaterias } from 'src/app/_models/UsuariosMaterias';


@Component({
  selector: 'app-add-materias',
  templateUrl: './add-materias.component.html',
  styleUrls: ['../../profile.component.scss']
})
export class AddMateriasComponent implements OnInit {
  userLE: Usuarios;
  materiasArray = [];
  dataSource: MatTableDataSource<MateriasData>;
  configColumns = [];
  generalConfig = {};
  isLoadingMat = false;
  snack: SnackModel = new SnackModel();
  usuariosMateriasSend: UsuariosMaterias = new UsuariosMaterias();

  constructor(
    private materiasService: MateriasService,
    private usuariosMateriasService: UsuariosMateriasService,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.userLE = JSON.parse(localStorage.getItem('user'));
    this.configColumns = [
      { value: 'materia' , title: 'Materia', action: false},
      { value: 'curso' , title: 'Curso', action: false},
      { value: 'acciones' , title: 'Accciones', action: true}
    ];
    this.generalConfig = {
      titleAdd: 'Agregar Materias',
      activeAddItem: false
    };
    this.getMaterias(this.userLE !== null ? this.userLE.email : 'email');
  }
  getMaterias(email: any) {
    this.isLoadingMat = true;
    this.materiasService.getAllFilter(email).subscribe(
      resp => {
        this.isLoadingMat = false;
        this.materiasArray = [];
        resp.bussinesData.forEach(element => {
          this.materiasArray.push({id: element.idMateria, materia: element.nombre, curso: element.curso.nombre,
            acciones: [
              {icon: 'fas fa-plus', name: 'Agregar', click: 'add', colorClass: 'primary'},
            ]
          });
        });
        this.dataSource = new MatTableDataSource(this.materiasArray);
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
  clickAction(item: any, action: any) {
    // console.log('click desde profile: ' + action + ' - ' + JSON.stringify(item));
    if (action === 'add') {
      this.isLoadingMat = true;
      this.usuariosMateriasService.createRelation(this.userLE.email,  item.id).subscribe(
        resp => {
          this.isLoadingMat = false;
          this.snack.elements = {};
          this.snack.elements.title = 'Agregar Registro';
          this.snack.elements.message = 'Exitoso';
          this.snack.type = 'ok';
          this.snack.icon = null;
          this.snackBar.openFromComponent(SnackBarComponent, {data: this.snack});
          this.getMaterias(this.userLE.email);
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
}
