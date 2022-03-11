import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from 'src/app/shared/models/LoginModel';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: LoginModel = {};
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  createLoginForm() {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }


  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.value)
      .pipe(finalize(() => { this.isLoading = false }))
      .subscribe(res => {
        console.log(res);
        this.authService.saveUser(res);
        this.toastr.success('Login success');
        this.activatedRoute.queryParamMap.subscribe(param => {
          if (param.has('returnURL') && param.get('returnURL') !== '') {
            let returnURL: any = param.get('returnURL');
            this.router.navigateByUrl(returnURL);
          } else {
            this.router.navigateByUrl('/');
          }
        });
      });
  }
}
