import { LoginComponent } from './_components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent } from './_components/prueba/prueba.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'prueba', component: PruebaComponent },
  { path: 'login', component: LoginComponent },
  { path: '**',  redirectTo: '/login', }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
