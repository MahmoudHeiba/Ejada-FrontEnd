import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/DialogData';
import { IPhoto } from 'src/app/shared/models/PhotoModel';

@Component({
    selector: 'app-admin-news',
    templateUrl: './add-edit-photo.component.html',
    styleUrls: ['./add-edit-photo.component.scss']
})
export class AddEditDialogComponent implements OnInit {

    item: IPhoto;
    uploaded = false;
    fileName = '';
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData<IPhoto>,
        private dialogRef: MatDialogRef<AddEditDialogComponent>) {
        this.item = data.item ?? {} as IPhoto;
    }

    ngOnInit() {
    }


    formControl = new FormControl('', [
        Validators.required
    ]);

    getErrorMessage() {
        return this.formControl.hasError('required') ? ' This filed is required!.' :
            '';
    }

    onChange(files:any) {
        debugger
        var file=  files.files[0]
        this.fileName = file.name;
        this.item.file = file;
        this.uploaded = true;
      }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmSave(): void {
        debugger
        this.dialogRef.close({ ...this.item });
    }

}
