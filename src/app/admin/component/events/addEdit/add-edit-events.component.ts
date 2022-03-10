import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/DialogData';
import { IEvent } from 'src/app/shared/models/EventModel';

@Component({
    selector: 'app-admin-news',
    templateUrl: './add-edit-events.component.html',
    styleUrls: ['./add-edit-events.component.scss']
})
export class AddEditDialogComponent implements OnInit {

    item: IEvent;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData<IEvent>,
        private dialogRef: MatDialogRef<AddEditDialogComponent>) {
        this.item = data.item ?? {} as IEvent;
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


    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmSave(): void {
        debugger
        this.dialogRef.close({ ...this.item });
    }

}
