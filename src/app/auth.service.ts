import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private af2Auth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = af2Auth.authState;
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        } else {
          return Observable.of(null);
        }
      });
  }

  login () {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.af2Auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout () {
    this.af2Auth.auth.signOut();
    this.router.navigateByUrl('/');
  }

}
