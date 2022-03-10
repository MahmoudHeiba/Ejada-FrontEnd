import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Filters } from 'src/app/shared/models/Filters';
import { environment } from 'src/environments/environment';
import { ListResponse } from 'src/app/shared/models/ListResponse';
import { ChangePasswordModel, ICheckedRoles, IUser, IUserRolesViewModel } from 'src/app/shared/models/User';


@Injectable()
export class AccountService {


  private SERVER_API = environment.SERVER_API + '/account';
  constructor(  
    private http: HttpClient
  ) { }

  GetUsers(filters: Filters | any): Observable<ListResponse<IUser>> {
    let params = new HttpParams();
    Object.keys(filters).forEach((elm) => {
      if (filters[elm] !== undefined && filters[elm] !== null && filters[elm] !== '') {
        params = params.append(elm, filters[elm]);
      }
    });
    return this.http.get<ListResponse<IUser>>(this.SERVER_API + '/getUsers', { params });
  }

  GetUserRoles(id: string): Observable<IUserRolesViewModel> {
    return this.http.get<IUserRolesViewModel>(this.SERVER_API + '/getUserRoles/' + id);
  }

  SaveUserRoles(id: string, roles: ICheckedRoles): Observable<IUserRolesViewModel> {
    return this.http.put<IUserRolesViewModel>(this.SERVER_API + '/saveUserRoles/' + id, roles);
  }

  AddUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.SERVER_API + '/register/', user);
  }

  EditUser(id: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.SERVER_API + '/editUser/' + id, user);
  }

  ActiveUser(id: string, status: boolean): Observable<IUser> {
    return this.http.put<IUser>(this.SERVER_API + '/active/' + id + '/' + status, null);
  }

  UpdateProfile(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.SERVER_API + '/updateProfile', user);
  }

  ChangePassword(model: ChangePasswordModel): Observable<IUser> {
    return this.http.put<IUser>(this.SERVER_API + '/changePassword', model);
  }


}
