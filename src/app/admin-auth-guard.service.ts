import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate() {
    return this.auth.appUser$
      .map(appUser => {
        if (appUser.isAdmin) {
          return true;
        } else {
          this.router.navigate(['/']);      
          return false;
        }
      });
  }

}
