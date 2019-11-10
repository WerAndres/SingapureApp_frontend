
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
      private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('idToken');        
        if (req.method === 'Options') {          
          return next.handle(req);
        }

        if (idToken) {
          req = req.clone({
            headers: req.headers.set('Authorization', `singapp ${idToken}`)
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS')
            .set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
          });
        };
        console.log('idToken: ' + idToken);
        console.log(JSON.stringify(req.headers));
        return next.handle(req).pipe(
          catchError((err: HttpErrorResponse) => {
            console.log('err:' + JSON.stringify(err));
            if (err.status === 401) {
              this.router.navigateByUrl('/login');
            }
            return throwError( err );
          })
        );
    }

}
