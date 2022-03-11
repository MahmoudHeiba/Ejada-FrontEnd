import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private registerService: RegisterService) { }
  ngOnInit(): void {
    this.registerForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      displayName: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    })
  }

  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.registerService.register(this.registerForm.value)
      .pipe(finalize(() => { this.isLoading = false }))
      .subscribe(res => {
        this.toastr.success('Successed, your request will approved soon');
        this.router.navigateByUrl('signIn');
      })
      }
}