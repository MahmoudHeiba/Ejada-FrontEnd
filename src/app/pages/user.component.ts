import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../admin/services/account.service';
import { Filters } from '../shared/models/Filters';
import { IUser } from '../shared/models/User';
import { RegisterComponent } from './register/register.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    isLoading: boolean = false;
    filters: any;
    isSticky = false;
    stickyHeight = 54;

    @Input() containerClass = "container";

    constructor(private dialog: MatDialog,
        private accountService: AccountService,
        private toastr: ToastrService) { }

    ngOnInit() {
    }


    addNew(row: IUser | any = {}): void {
        const dialogRef = this.dialog.open(RegisterComponent, {
            position: {
                top: '2%',
            },
            data: {
                item: { ...row },
                title: 'Add new user'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.isLoading = true;
                this.accountService.AddUser(result).subscribe(
                    data => {
                        this.filters = new Filters();
                        this.loadData();
                        this.toastr.success('Add new user successfully done');
                        this.isLoading = false;
                    }, err => {
                        this.isLoading = false;
                        this.addNew(result);
                    });
            }
        });
    }
    loadData() {
        throw new Error('Method not implemented.');
    }

   
}