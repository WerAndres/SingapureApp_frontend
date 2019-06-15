
import { Component, OnInit } from '@angular/core';
import { PruebaService } from 'src/app/_services/prueba.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  id: any;
  content: any;

  constructor(private pruebaService: PruebaService) { }

  ngOnInit() {
    this.pruebaService.getPrueba(2, 'prueba').subscribe(
      resp => {
        this.id = resp.id;
        this.content = resp.content;
        console.log('resp_ ' + JSON.stringify(resp));
      },
      error => {
          console.log('error', 'Damn', 'Something went wrong...');
      },
      () => {
        console.log('success', 'Complete', 'Getting all values complete');
    });
  }

}
