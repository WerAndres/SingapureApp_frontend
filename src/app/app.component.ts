import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Usuarios } from './_models/Usuarios';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SingapureApp';
  menuBar: any;
  ram: any = 1;
  name: any = 'usuario';
  imageEnc: any;
  rolPerson: any = 'rol';
  heigthImg: any;
  widthImg: any;
  userLE: Usuarios;
  menuItems: any = [
    {name: 'Dashboard', active: false, icon: 'fas fa-th', route: '/dashboard', roles: ['Padre', 'Alumno', 'Profesor']},
    {name: 'Perfil', active: false, icon: 'fas fa-user', route: '/profile', roles: ['Padre', 'Alumno', 'Profesor']},
    {name: 'Gestión academica', active: false, icon: 'fas fa-tasks', route: '/academicManagment', roles: ['Profesor']},
    {name: 'Foro', active: false, icon: 'fas fa-comments', route: '/forum', roles: ['Padre', 'Alumno', 'Profesor']},
    {name: 'Recursos didácticos', active: false, icon: 'fas fa-bolt', route: '/resources', roles: ['Padre', 'Alumno', 'Profesor']},
    {name: 'Salir', active: false, icon: 'fas fa-sign-out-alt', route: '/login', roles: ['Padre', 'Alumno', 'Profesor']},
  ];
  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((val) => {
      this.init();
  });
    router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(e => {
        this.menuBar = route.root.firstChild.snapshot.data.menuBar;
    });
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.ram = this.getRandomArbitrary(1, 9);
    this.activeChangedUrl();
    this.userLE = JSON.parse(localStorage.getItem('user'))
    this.name = this.userLE !== null ? this.userLE.nombre : 'Usuario';
    this.rolPerson = this.userLE !== null ? this.userLE.tipoUsuario.nombre : 'rol';
    this.imageEnc = this.userLE !== null && typeof this.userLE !== 'undefined' ? ((this.userLE.photo === null || typeof this.userLE.photo === 'undefined') ? '' : this.userLE.photo) : '';
  }
  activeChangedUrl() {
    const arrayPath = window.location.href.split('/');
    this.setActive(arrayPath[arrayPath.length - 1]);
  }
  activeBar(item: any) {
    this.inactiveMenu();
    item.active = true;
    this.router.navigate([item.route]);
    const element: HTMLElement = document.getElementsByClassName('mat-drawer-backdrop')[0] as HTMLElement;
    element.click();
  }
  inactiveMenu() {
    this.menuItems.forEach(element => {
      element.active = false;
    });
  }
  setActive(valueSearch: any) {
    this.inactiveMenu();
    this.menuItems.forEach(element => {
      if (element.name.toLowerCase().includes(valueSearch.toLowerCase())) {
        element.active = true;
      }
    });
  }
  routeDashBoard() {
    this.router.navigate(['/profile']);
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
  roleActiveMenu(arrayRole: any){
    return arrayRole.includes(this.userLE.tipoUsuario.nombre);
  }
}

