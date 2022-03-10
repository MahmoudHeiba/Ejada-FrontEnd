import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/DialogData';
import { IUser } from 'src/app/shared/models/User';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    item: IUser | any;
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: DialogData<IUser>,
      private dialogRef: MatDialogRef<RegisterComponent>) {
      this.item = data.item;
    }
    ngOnInit(): void {
      
    }
  
    formControl = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(4),
    ]);
  
    getErrorMessage(mail = false) {
      if (mail) {
        return 'The Email not correct';
      }
      return this.formControl.hasError('email') ? 'The Email not correct' :
        this.formControl.hasError('minlength') ? 'short password ' :
          this.formControl.hasError('required') ? 'This file is required':''          
    }
  
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    confirmSave(): void {
      this.dialogRef.close({ ...this.item });
    }
}