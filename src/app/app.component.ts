import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService
  ) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);

        let justLoggedIn = localStorage.getItem('justLoggedIn');

        if (justLoggedIn) {
          localStorage.removeItem('justLoggedIn');

          let returnUrl = localStorage.getItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    });
  }

  isHomeRoute() {
    return this.router.url === '/';
  }

}
