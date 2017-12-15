import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input('isTransparent') isTransparent = false;

  get user () {
    return this.authService.user;
  }
  
  constructor(private authService: AuthService) { 
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
