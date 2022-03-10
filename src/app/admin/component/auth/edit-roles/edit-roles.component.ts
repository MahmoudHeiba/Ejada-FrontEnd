import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ICheckedRoles, IRoleViewModel, IUser } from 'src/app/shared/models/User';
import { AccountService } from 'src/app/admin/services/account.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})

export class EditRolesComponent implements OnInit {

  id: any;
  user: IUser |any = {};
  roles: IRoleViewModel[] | any = [];
  checkedRoles: ICheckedRoles | any = {};
  isLoading: boolean;

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.loadData();
    });
  }

  loadData(): void {
    this.isLoading = true;
    this.accountService.GetUserRoles(this.id).subscribe(
      data => {
        this.user = data.userModel;
        this.roles = data.roles;
        this.checkedRoles = data.checkedRoles;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  saveRoles(): void {
    this.isLoading = true;
    this.accountService.SaveUserRoles(this.id, { ...this.checkedRoles }).subscribe(
      data => {
        this.toastr.success('Save successfully');
        this.isLoading = false;
        this.router.navigate(['/admin', 'auth', 'users']);
      },
      err => {
        this.isLoading = false;
      }
    );
  }

}

