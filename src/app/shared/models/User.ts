export interface IUser {
    id: string,
    userName: string,
    displayName: string,
    password: string,
    email: string,
    phoneNumber: string,
    isActive: boolean,
    token: string,
    roles?:string[],
}


export interface IUserInfo {
    userData?: IUser;
    token?: string;
  }

  export interface IRole {
    id?: string;
    name?: string;
    parentId?: string;
    order?: number;
    sort?: number;
  
  }


  export interface IRoleViewModel {
    selected?: boolean;
    appRole?: IRole;
    childAppRoles?: IRoleViewModel[];
  }
  
  export interface IUserRolesViewModel {
    userModel?: IUser;
    roles?: IRoleViewModel[];
    checkedRoles?: ICheckedRoles;
  }
  
  export interface ICheckedRoles {
    [id: string]: boolean;
  }
  
  export interface ChangePasswordModel {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }