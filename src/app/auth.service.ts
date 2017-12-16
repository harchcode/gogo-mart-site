import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService implements OnDestroy {
  user: firebase.User;
  private subscription: Subscription;

  constructor(
    private af2Auth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subscription = af2Auth.authState.subscribe(user => {
      this.user = user;

      if (this.user) {
        let justLoggedIn = localStorage.getItem('justLoggedIn');

        if (justLoggedIn) {
          localStorage.removeItem('justLoggedIn');

          let returnUrl = localStorage.getItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login () {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    localStorage.setItem('justLoggedIn', 'true');

    this.af2Auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout () {
    this.af2Auth.auth.signOut();
  }

}
