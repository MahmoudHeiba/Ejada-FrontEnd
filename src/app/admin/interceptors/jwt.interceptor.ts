import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthAdminService } from '../services/auth-admin-service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    username: string;
    authToken: string;
    constructor(private authenticationService: AuthAdminService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.username = this.authenticationService.getUsername();
        this.authToken = this.authenticationService.getUserToken();
        if (this.username && this.authToken) {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authToken}`
                }
            });
        }
        return next.handle(request);
    }
}