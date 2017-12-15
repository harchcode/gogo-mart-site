import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthService implements OnDestroy {
  user: firebase.User;
  private subscription: Subscription;

  constructor(private af2Auth: AngularFireAuth) {
    this.subscription = af2Auth.authState.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login () {
    this.af2Auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout () {
    this.af2Auth.auth.signOut();
  }

}
