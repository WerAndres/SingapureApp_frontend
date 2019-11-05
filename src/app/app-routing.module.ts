import { ProfileComponent } from './_components/pages/profile/profile.component';
import { ForumComponent } from './_components/pages/forum/forum.component';
import { ResourcesComponent } from './_components/pages/resources/resources.component';
import { ActivitiesComponent } from './_components/pages/activities/activities.component';
import { DashboardComponent } from './_components/pages/dashboard/dashboard.component';
import { LoginComponent } from './_components/pages/login/login.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule, CanActivate, Routes } from '@angular/router';
import { PruebaComponent } from './_components/prueba/prueba.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './_components/pages/register/register.component';
import { AuthGuardService as AuthGuard } from './_services/middleware/AuthGuard.service';

const routes: Routes = [
  { path: 'prueba', component: PruebaComponent, canActivate: [AuthGuard], data: { menuBar: true }},
  { path: 'login', component: LoginComponent, data: { menuBar: false }},
  { path: 'register', component: RegisterComponent, data: { menuBar: false }},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { menuBar: true }},
  { path: 'activities', component: ActivitiesComponent, canActivate: [AuthGuard], data: { menuBar: true }},
  { path: 'forum', component: ForumComponent, canActivate: [AuthGuard], data: { menuBar: true }},
  { path: 'resources', component: ResourcesComponent, canActivate: [AuthGuard], data: { menuBar: true }},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { menuBar: true }},
  { path: '**',  redirectTo: '/login' }
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
