import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../_services/auth/auth.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
