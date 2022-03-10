import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthAdminService } from '../services/auth-admin-service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(
    private loginService: AuthAdminService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoginStatus(state) && this.checkUserAuthorize(next);
  }
  checkLoginStatus(state: RouterStateSnapshot): boolean {
    if (this.loginService.getUserToken()) {
      return true;
    } else {
      this.router.navigate(['/admin/login'], { queryParams: { returnURL: state.url } });
      return false;
    }
  }

  checkUserAuthorize(route: any): boolean {
    const hasRole = route.data.roles ? this.loginService.checkAuthorize(route.data.roles) : true;
    if (!hasRole) {
      this.toastr.error('You do not have permission');
      this.router.navigate(['/']);
    }
    return hasRole;
  }

}