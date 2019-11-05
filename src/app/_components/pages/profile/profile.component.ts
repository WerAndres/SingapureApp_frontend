import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imageEnc: any;
  ram: any;
  ngOnInit() {
    this.ram = this.getRandomArbitrary(1, 9);
    this.imageEnc = JSON.parse(localStorage.getItem('user')) !== null ?
    (JSON.parse(localStorage.getItem('user')).photo !== null ? JSON.parse(localStorage.getItem('user')).photo : '') : '';
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
