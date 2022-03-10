import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/DialogData';
import { IUser } from 'src/app/shared/models/User';

@Component({
  selector: 'app-edit-user.dialog',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.scss']
})

export class EditDialogComponent {

  item: IUser | any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData<IUser>,
    private dialogRef: MatDialogRef<EditDialogComponent>) {
    this.item = data.item;
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

