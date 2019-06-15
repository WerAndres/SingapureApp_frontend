import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent } from './_components/prueba/prueba.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'prueba', component: PruebaComponent },
  { path: '**',  redirectTo: '/', }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
