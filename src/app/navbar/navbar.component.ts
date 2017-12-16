import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input('isTransparent') isTransparent = false;

  user: AppUser;
  
  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
