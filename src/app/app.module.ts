import { ProfileComponent } from './_components/pages/profile/profile.component';
import { ResourcesComponent } from './_components/pages/resources/resources.component';
import { ActivitiesComponent } from './_components/pages/activities/activities.component';
import { ForumComponent } from './_components/pages/forum/forum.component';
import { DashboardComponent } from './_components/pages/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PruebaComponent } from './_components/prueba/prueba.component';
import { LoginComponent } from './_components/pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatGridListModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatSidenavModule,
  MatExpansionModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatButtonToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule
} from '@angular/material';
import { SnackBarComponent } from './_components/util/snack-bar-component/snack-bar.component';
import { RegisterComponent } from './_components/pages/register/register.component';
import { LoadingComponent } from './_components/util/loading/loading.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './_services/middleware/AuthInterceptor.service';
import { AuthGuardService } from './_services/middleware/AuthGuard.service';
import { Meta } from '@angular/platform-browser';
import { TableComponent } from './_components/util/table-component/table.component';
import { DialogComponent } from './_components/util/dialog/dialog.component';
import { AddMateriasComponent } from './_components/pages/profile/dialog/addMaterias/add-materias.component';
import { AddPadresComponent } from './_components/pages/profile/dialog/addPadres/add-padres.component';
import { AddAlumnosComponent } from './_components/pages/profile/dialog/addAlumnos/add-alumnos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PruebaComponent,
    SnackBarComponent,
    TableComponent,
    LoadingComponent,
    DashboardComponent,
    ForumComponent,
    ActivitiesComponent,
    ResourcesComponent,
    ProfileComponent,
    DialogComponent,
    AddMateriasComponent,
    AddPadresComponent,
    AddAlumnosComponent
  ],
  entryComponents: [
    SnackBarComponent,
    DialogComponent,
    TableComponent,
    AddMateriasComponent,
    AddPadresComponent,
    AddAlumnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatDialogModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return JSON.parse(localStorage.getItem('user')).token;
        },
        whitelistedDomains: ['localhost:4224'],
        blacklistedRoutes: ['http://localhost:4224/login']
      }
    })
  ],
  providers: [
    AuthGuardService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'theme-color', content: '#F00' });
  }
 }
