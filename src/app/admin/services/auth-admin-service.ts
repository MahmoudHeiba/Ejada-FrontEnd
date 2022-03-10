import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, Observable } from 'rxjs';
import { IUser } from "src/app/shared/models/User";
import { SessionStorageService } from "src/app/shared/session-storage.service";

@Injectable()
export class AuthAdminService {
    private SERVER_API = environment.SERVER_API + '/Account';
    userInfo: IUser;
    userInfoKey = 'userAuthData';


    constructor(
        private sessionStorage: SessionStorageService,
        private httpClient: HttpClient,
    ) {
        this.loaduserInfo();
    }

    loaduserInfo() {
        this.userInfo = this.sessionStorage.get(this.userInfoKey, true);
    }


    getUserToken(): any {
        return this.userInfo ? this.userInfo.token : null;
    }
    getUsername(): any {
        return this.userInfo && this.userInfo ? this.userInfo.userName : null;
    }


    getUserRoles() {
        return this.userInfo && this.userInfo ? this.userInfo.roles : null;
    }

    setUserInfo(newUserInfo: IUser): void {
        this.userInfo = { ...newUserInfo };
        this.sessionStorage.set(this.userInfoKey, this.userInfo, true);
    }

    login(email?: string, password?: string): Observable<IUser> {
        return this.httpClient.post<IUser>(this.SERVER_API + '/login', { email, password ,isAdmin:true});
    }



    checkAuthorize(routeRoles: any): boolean {
        return this.getUserRoles()?.findIndex(c => routeRoles.includes(c)) !== -1;
    }

    logout(): void {
        this.sessionStorage.remove(this.userInfoKey);
        this.userInfo = {} as IUser;
    }

}