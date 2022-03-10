import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/shared/models/LoginModel';
import { AuthAdminService } from '../../services/auth-admin-service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: LoginModel = {};
  isLoading: boolean = false;
  loginForm: FormGroup;
  constructor(
    private authService: AuthAdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // formControl = new FormControl('', [
  //   Validators.required
  // ]);
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)

    });
  }


  ngOnInit() {
this.createLoginForm();
  }


  getErrorMessage() {
    // return this.formControl.hasError('required') ? 'Required' :
    //   '';
  }

  public onSubmit() {
    if(this.loginForm.valid){
      this.isLoading = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res) => {
        this.toastr.success('Login success');
        this.authService.setUserInfo({ ...res });
        this.activatedRoute.queryParamMap.subscribe(param => {
          if (param.has('returnURL') && param.get('returnURL') !== '') {
            let returnURL: any = param.get('returnURL');
            this.router.navigateByUrl(returnURL);
          } else {
            this.router.navigateByUrl('/admin');
          }
          this.isLoading = false;
        });
      },
        (err) => {
          this.isLoading = false;
        });
    }    
  }
}
