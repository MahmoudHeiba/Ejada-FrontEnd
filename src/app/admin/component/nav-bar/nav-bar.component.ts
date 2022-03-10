import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/User';
import { AuthAdminService } from '../../services/auth-admin-service';
 

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  userInfo: IUser;

  constructor(
    private authService: AuthAdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
 
    this.userInfo = this.authService.userInfo;
  }

  public logout() {
 
    this.authService.logout();
     
    this.router.navigate(['/']);
  }
}
