import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/User';
import { Filters } from 'src/app/shared/models/Filters';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../dialogs/edit/edit.dialog.component';
import { ActiveDialogComponent } from '../dialogs/active/active.dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { AccountService } from 'src/app/admin/services/account.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  displayedColumns = ['num', 'name', 'email', 'userName', 'phoneNumber', 'actions'];
  dataSource: IUser[] | any = [];
  totalCount: number | any = 0;
  id: string;
  filters = new Filters();
  searchKeySubs: Subscription;
  isLoading: boolean;

  constructor(
    private dialog: MatDialog,
    private accountService: AccountService,
    private toastr: ToastrService,
  ) {
  }


  ngOnInit() {
    this.filters = new Filters();
    this.loadData();
  }

  refresh(): void {
    this.filters = new Filters();
    this.loadData();
  }

  addNew(row: IUser | any = {}): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
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

  startEdit(row: IUser, rowIndex: number = 0): void {
    this.id = row.id;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      position: {
        top: '2%',
      },
      data: {
        item: { ...row },
        title: 'Edit the user',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.accountService.EditUser(this.id, result).subscribe(
          data => {
            this.loadData();
            this.toastr.info('Edit successfully done');
            this.isLoading = false;
          }, err => {
            this.isLoading = false;
            this.startEdit(result, rowIndex);
          });
      }
    });
  }

  activeUser(row: IUser): void {
    this.id = row.id;
    const dialogRef = this.dialog.open(ActiveDialogComponent, {
      position: {
        top: '2%',
      },
      data: { ...row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.accountService.ActiveUser(this.id, !row.isActive).subscribe(
          data => {
            this.filters = new Filters();
            this.loadData();
            if (data.isActive) {
              this.toastr.success('Activation Done');
            } else {
              this.toastr.warning('Un-activation Done');
            }
            this.isLoading = false;
          }, err => {
            this.isLoading = false;
          });
      }
    });
  }

  loadData(): void {
    this.isLoading = true;
    this.accountService.GetUsers({ ...this.filters }).subscribe(
      data => {
        this.dataSource = data.rows;
        this.totalCount = data.totalRows;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  onPage(pageEvent: PageEvent): void {
    this.filters.limit = pageEvent.pageSize;
    this.filters.pageIndex = pageEvent.pageIndex;
    this.filters.offset = pageEvent.pageIndex * pageEvent.pageSize;
    this.loadData();
  }

  onFilter(key: string): void {
    this.searchKeySubs = interval(1000).pipe(
      map(() => key),
      distinctUntilChanged()
    ).subscribe((value) => {
      console.log(value);
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    if (this.searchKeySubs) {
      this.searchKeySubs.unsubscribe();
    }
  }
}
