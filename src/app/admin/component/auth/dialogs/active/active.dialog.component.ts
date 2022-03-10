import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/shared/models/User';


@Component({
  selector: 'app-active.dialog',
  templateUrl: './active.dialog.html',
  styleUrls: ['./active.dialog.scss']
})
export class ActiveDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private dialogRef: MatDialogRef<ActiveDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmActice(): void {
    this.dialogRef.close(true);
  }
}
