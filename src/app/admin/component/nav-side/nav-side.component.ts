import { Component } from '@angular/core';
import { ROUTE } from 'src/app/shared/models/Route';
import { AuthAdminService } from '../../services/auth-admin-service';

// import { AuthService } from 'auth';

@Component({
  selector: 'app-admin-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent {

  year = new Date().getFullYear();

  masterRoutes: ROUTE[] = [
    {
      icon: 'folder',
      route: 'news',
      title: 'News',
    },
    {
      icon: 'event',
      route: 'event',
      title: 'Events',
    },
  
    {
      icon: 'image',
      route: 'photo',
      title: 'Library Photo',
    },
    {
      icon: 'ondemand_video',
      route: 'video',
      title: 'Library Video',
    }   
  ];

  myAuthRoutes: ROUTE[] = [
    {
      icon: 'person',
      route: 'auth/users',
      title: 'Users',
      role: 'admin',
    }
  ];

  

  constructor(
    private authService: AuthAdminService
  ) { }
 
  public checkRole(role?: string): boolean {
   
    return this.authService.checkAuthorize([role, 'admin']);
  }


  public checkRoles(routes: ROUTE[]): boolean {
    return this.authService.checkAuthorize([...routes.map(c => c.role || c.route), 'admin']);
  }

}

