import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PruebaComponent } from './_components/prueba/prueba.component';
import { LoginComponent } from './_components/pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from './_components/pages/principal/principal.component';
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
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';
import { SnackBarComponent } from './_components/util/snack-bar-component/snack-bar.component';
import { RegisterComponent } from './_components/pages/register/register.component';
import { LoadingComponent } from './_components/util/loading/loading.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptoService } from './_services/middleware/AuthInterceptor.service';
import { AuthGuardService } from './_services/middleware/AuthGuard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PruebaComponent,
    PrincipalComponent,
    SnackBarComponent,
    LoadingComponent
  ],
  entryComponents: [
    SnackBarComponent
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
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return JSON.parse(localStorage.getItem('user')).token;
        },
        whitelistedDomains: ['localhost:4220'],
        blacklistedRoutes: ['http://localhost:4220/login']
      }
    })
  ],
  providers: [
    AuthGuardService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptoService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
