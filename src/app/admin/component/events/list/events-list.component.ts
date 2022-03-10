import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/admin/services/auth-admin-service';
import { AddEditDialogComponent } from '../addEdit/add-edit-events.component';
import { NewsService } from 'src/app/admin/services/news-service';
import { Filters } from 'src/app/shared/models/Filters';
import { distinctUntilChanged, interval, map, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DeleteDialogComponent } from 'src/app/shared/components/delete/delete.dialog.component';
import { IEvent } from 'src/app/shared/models/EventModel';
import { EventsService } from 'src/app/admin/services/events-service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventListComponent implements OnInit {
  totalCount: number | any = 0;
  isLoading = false;
  dataSource: IEvent[] | any = [];
  id: number;
  filters = new Filters();
  searchKeySubs: Subscription;
  constructor(private authService: AuthAdminService,
    private dialog: MatDialog,
    private eventService: EventsService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.filters = new Filters();
    this.loadData();
  }

  refresh(): void {
    this.filters = new Filters();
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.eventService.GetAll({ ...this.filters }).subscribe(
      data => {
        this.dataSource = data?.rows;
        this.totalCount = data?.totalRows;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  addNew(row: any = {}): void {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      position: {
        top: '3%',
      },
      width: "70vw",
      height: "max-content",
      data: {
        item: { ...row },
        title: 'Add new item.'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isLoading = true;
        this.eventService.post(result).subscribe(res => {
          if (res) {
            this.isLoading = false;
            this.loadData();
          }
        })
      }
    });
  }


  deleteItem(item: IEvent): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      position: {
        top: '2%',
      },
      width: "75vw",
      height: "max-content",
      data: { ...item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.eventService.remove(item.id).subscribe(
          data => {
            this.filters = new Filters();
            this.loadData();
            this.toastr.warning('Delelte the item ' + item.title + ' Done');
            this.isLoading = false;
          }, err => {
            this.isLoading = false;
          });
      }
    });
  }

  activeItem(row: IEvent): void {
    this.isLoading = true;
    this.id = row.id;
    this.eventService.activeItem(this.id, !row.isActive).subscribe(
      data => {
        this.filters = new Filters();
        this.loadData();
        if (data.isActive) {
          this.toastr.success('The item {' + row.title + '} activation');
        } else {
          this.toastr.warning('The item {' + row.title + '} un-activation');
        }
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      });
  }


  onFilter(key: string): void {
    this.searchKeySubs = interval(1000).pipe(
      map(() => key),
      distinctUntilChanged()
    ).subscribe(() => {
      this.loadData();
    });
  }

  onPage(pageEvent: PageEvent): void {
    debugger
    this.filters.limit = pageEvent.pageSize;
    this.filters.pageIndex = pageEvent.pageIndex;
    this.filters.offset = pageEvent.pageIndex * pageEvent.pageSize;
    this.loadData();
  }

  checkRole(action: string): boolean {
    return this.authService.checkAuthorize([`news-${action}`, 'admin']);
  }

}
