import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/DialogData';
import { IVideo } from 'src/app/shared/models/VideoModel';

@Component({
    selector: 'app-admin-news',
    templateUrl: './add-edit-video.component.html',
    styleUrls: ['./add-edit-video.component.scss']
})
export class AddEditDialogComponent implements OnInit {

    item: IVideo;
    uploaded = false;
    fileName = '';
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData<IVideo>,
        private dialogRef: MatDialogRef<AddEditDialogComponent>) {
        this.item = data.item ?? {} as IVideo;
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
