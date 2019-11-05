import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SingapureApp';
  menuBar: any;
  ram: any = 1;
  name: any = 'usuario';
  imageEnc: any;
  rolPerson: any = 'rol';
  menuItems: any = [
    {name: 'Dashboard', active: false, icon: 'fas fa-th', route: '/dashboard'},
    {name: 'Profile', active: false, icon: 'fas fa-user', route: '/profile'},
    {name: 'Forum', active: false, icon: 'fas fa-comments', route: '/forum'},
    {name: 'Activities', active: false, icon: 'fas fa-tablet-alt', route: '/activities'},
    {name: 'Resources', active: false, icon: 'fas fa-bolt', route: '/resources'},
    {name: 'Logout', active: false, icon: 'fas fa-sign-out-alt', route: '/login'},
  ]
  constructor(private router:Router, private route:ActivatedRoute) {
    router.events.subscribe((val) => {
      this.init();
  });
    router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(e => {
        this.menuBar = route.root.firstChild.snapshot.data['menuBar'];
    })
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.ram = this.getRandomArbitrary(1, 9);
    this.activeChangedUrl();
    this.name = JSON.parse(localStorage.getItem('user')) !== null ? JSON.parse(localStorage.getItem('user')).nombre : 'Usuario';
    this.rolPerson = JSON.parse(localStorage.getItem('user')) !== null ?
    JSON.parse(localStorage.getItem('user')).tipoUsuario.nombre : 'rol';
    this.imageEnc = JSON.parse(localStorage.getItem('user')) !== null ?
    (JSON.parse(localStorage.getItem('user')).photo !== null ? JSON.parse(localStorage.getItem('user')).photo : '') : '';
  }
  activeChangedUrl() {
    const arrayPath = window.location.href.split('/');
    this.setActive(arrayPath[arrayPath.length - 1]);
  }
  activeBar(item: any) {
    this.inactiveMenu();
    item.active = true
    this.router.navigate([item.route]);
    const element: HTMLElement = document.getElementsByClassName('mat-drawer-backdrop')[0] as HTMLElement;
    element.click();
  }
  inactiveMenu() {
    this.menuItems.forEach(element => {
      element.active = false
    });
  }
  setActive(valueSearch:any){
    this.inactiveMenu();
    this.menuItems.forEach(element => {
      if(element.name.toLowerCase().includes(valueSearch.toLowerCase())){
        element.active = true;
      }
    });
  }
  routeDashBoard() {
    this.router.navigate(['/dashboard']);
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

