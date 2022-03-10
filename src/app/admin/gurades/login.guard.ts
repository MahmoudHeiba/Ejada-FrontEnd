import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthAdminService } from '../services/auth-admin-service';

@Injectable()
export class AuthLoginGuard implements CanActivate {

    constructor(private loginService: AuthAdminService, private router: Router) { }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkLoginStatus();
    }

    checkLoginStatus(): boolean {
        if (this.loginService.getUserToken()) {
            this.router.navigate(['/admin']);
            return false;
        } else {
            return true;
        }
    }
}