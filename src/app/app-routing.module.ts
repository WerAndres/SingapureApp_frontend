import { LoginComponent } from './_components/pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PruebaComponent } from './_components/prueba/prueba.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './_components/pages/register/register.component';
import { PrincipalComponent } from './_components/pages/principal/principal.component';
import { AuthGuardService as AuthGuard } from './_services/middleware/AuthGuard.service';
const routes: Routes = [
  { path: 'prueba', component: PruebaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard] },
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
