import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthAdminService } from '../services/auth-admin-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthAdminService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      this.manageError(err);
      return throwError(err);
    }));
  }

  manageError(err: any): void {
    if (err.error && err.error?.statusCode === 401) {
      this.toastr.error(err.error.message);
      this.router.navigate(['/user']);
    }
    else if (err.error && err.error?.message) {
      this.toastr.error(err.error.message);
    } else {
      this.toastr.error('System Error');
    }
  }

}