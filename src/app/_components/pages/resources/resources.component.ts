import { TemasService } from 'src/app/_services/utils/temas.service';
import { Component, OnInit, HostListener, Pipe, PipeTransform } from '@angular/core';
import { Usuarios } from 'src/app/_models/Usuarios';
import { Router } from '@angular/router';
import { SnackModel } from 'src/app/_models/SnackModel';
import { SnackBarComponent } from '../../util/snack-bar-component/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { Temas } from 'src/app/_models/Temas';
import { Interacciones } from 'src/app/_models/Interacciones';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActividadesService } from 'src/app/_services/utils/actividades.service';
import { Activities } from '../../util/interfaces/util-interfaces';
import { Title } from '@angular/platform-browser';

@Pipe({ name: 'UrlPipe' })
export class UrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  titleClass = 'Clase';
  titleClassOld = 'Clase';
  openListMat = false;
  ram: any = 1;
  itemActiveMsg: any;
  imageEnc: any;
  heigthImg: any;
  widthImg: any;
  userLE: Usuarios;
  isLoadingMat = false;
  isLoadingMesg = false;
  listMat: {};
  listMatDef: any;
  listMessage: any;
  activeInput = false;
  listMsgDef: any = [];
  snack: SnackModel = new SnackModel();
  listMatPadAlum: Temas[];
  screenWidth: any = 0;
  messageInput = '';
  intSend: Interacciones;
  urlPrin: any = '';
  urlAlt: any = '';
  textRep: any = '';
  resourceActive: any = '';
  resourceType: any = '';
  activities: Activities[] = [];
  listAct = {};
  selectedActivity: any;
  constructor(
    private router: Router,
    private temasService: TemasService,
    private actividadesService: ActividadesService,
    private sanitizer: DomSanitizer,
    public snackBar: MatSnackBar,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.setTitle('Recursos didácticos - SingapureApp');
    this.ram = this.getRandomArbitrary(1, 9);
    this.userLE = JSON.parse(localStorage.getItem('user'));
    this.imageEnc = (this.userLE !== null && typeof this.userLE !== 'undefined') ?
    ((this.userLE.photo !== null && typeof this.userLE.photo !== 'undefined') ? this.userLE.photo : '') : '';
    this.getTemas();
    this.screenWidth = window.innerWidth;
  }
  onImageLoad(event) {
    if (typeof this.imageEnc !== 'undefined' && this.imageEnc !== null) {
      const loadedImage = event.currentTarget;
      // tslint:disable-next-line:no-string-literal
      const width = loadedImage['width'];
      // tslint:disable-next-line:no-string-literal
      const height = loadedImage['height'];
      this.heigthImg = height;
      this.widthImg = width;
    }
  }
  toProfile() {
    this.router.navigate(['/profile']);
  }
  getTemas() {
    const rol = this.userLE.tipoUsuario.nombre;
    // console.log(rol);
    this.isLoadingMat = true;
    this.temasService.getAllFilter(this.userLE.email).subscribe(
      resp => {
        this.isLoadingMat = false;
        this.listMatPadAlum = resp.bussinesData;
        // console.log('----->' + JSON.stringify(this.listMatPadAlum));
        this.listMat = {};
        this.listMatDef = [];
        this.selectedActivity = 0;
        this.listMatPadAlum.forEach(element => {
          if (typeof this.listMat[element.materia.idMateria] !== 'undefined') {
            this.listMat[element.materia.idMateria].temasObj[element.idTema] = { idTema: element.idTema, nombre: element.nombre };
          } else {
            this.listMat[element.materia.idMateria] = {};
            this.listMat[element.materia.idMateria] = {id: element.materia.idMateria,
              nombre: element.materia.nombre + ' - ' + element.materia.curso.nombre, alumnosObj: {} , temasObj: {}};
            if (element.materia.usuariosAlumnos !==  null && typeof element.materia.usuariosAlumnos !== 'undefined') {
              if (element.materia.usuariosAlumnos.length > 0) {
                element.materia.usuariosAlumnos.forEach(ele => {
                  // console.log(ele.alumno.nombre);
                  if (typeof this.listMat[element.materia.idMateria].alumnosObj[ele.alumno.idUsuario] === 'undefined'){
                    this.listMat[element.materia.idMateria].alumnosObj[ele.alumno.idUsuario] = ele.alumno.nombre ;
                  } else {
                    this.listMat[element.materia.idMateria].alumnosObj[ele.alumno.idUsuario] =
                    this.listMat[element.materia.idMateria].alumnosObj[ele.alumno.idUsuario] + ', ' + ele.alumno.nombre ;
                  }
                });
              }
            }
            this.listMat[element.materia.idMateria].temasObj[element.idTema] = { idTema: element.idTema, nombre: element.nombre };
          }
        });
        // console.log('----->' + JSON.stringify(this.listMat));
        const keys = Object.keys(this.listMat);
        keys.forEach(element => {
          const keysTem = Object.keys(this.listMat[element].temasObj);
          if (keysTem.length === 0) {
            this.listMat[element].temasArray = [];
          }
          keysTem.forEach(ele => {
            if (typeof this.listMat[element].temasArray === 'undefined') {
              this.listMat[element].temasArray = [];
            }
            this.listMat[element].temasArray.push(this.listMat[element].temasObj[ele]);
          });
          this.listMat[element].temasObj = null;
          const keysalum = Object.keys(this.listMat[element].alumnosObj);
          if (keysalum.length === 0) {
            this.listMat[element].alumnosArray = [];
          }
          keysalum.forEach(ele => {
            if (typeof this.listMat[element].alumnosArray === 'undefined') {
              this.listMat[element].alumnosArray = [];
            }
            this.listMat[element].alumnosArray.push(this.listMat[element].alumnosObj[ele]);
          });
          this.listMat[element].alumnosObj = null;
          this.listMatDef.push(this.listMat[element]);
        });
        // console.log('----->' + JSON.stringify(this.listMatDef));
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
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }
  clickItemChannel(item) {
    console.log(JSON.stringify(item));
    this.isLoadingMat = true;
    this.titleClass = item.nombre;
    this.titleClassOld = item.nombre;
    this.actividadesService.getAllFilterTema(item.idTema).subscribe(
      resp => {
        this.isLoadingMat = false;
        // console.log('resp: ' + JSON.stringify(resp))
        this.activities = [];
        resp.bussinesData.forEach(element => {
          this.activities.push({idActividad: element.idActividad, nombre: element.nombre});
          this.listAct[element.idActividad] = element;
        });
        if (this.activities.length > 0) {
          this.selectedActivity = 1;
          this.onChangeActivity(this.activities[0].idActividad);
        }
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
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  viewPanwl(opt: any) {
    this.resourceActive = opt;
  }
  onChangeActivity(item: any) {
    // console.log(JSON.stringify(item));
    this.selectedActivity = item;
    this.titleClass = this.titleClassOld + ' - ' + this.listAct[item].nombre;
    this.resourceType = this.listAct[item].tiposActividades.nombre === 'multimedia' ? 'video' :
    (this.listAct[item].tiposActividades.nombre === 'pdf' ? 'pdf'
    : (this.listAct[item].tiposActividades.nombre === 'dinamica' ? 'dinamica' : '')) ;
    this.resourceActive = this.resourceType;
    this.urlPrin = this.listAct[item].urlPrincipal;
    this.urlAlt = this.listAct[item].urlAlternativa;
    this.textRep = this.listAct[item].texto;
  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
