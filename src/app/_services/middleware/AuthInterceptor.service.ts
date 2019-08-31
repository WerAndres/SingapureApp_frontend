import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptoService implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('idToken');

        if (idToken) {
            req.headers.set('Authorization', 'singapp ' + idToken);
            req.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
            const cloned = req.clone({
                headers: req.headers
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
