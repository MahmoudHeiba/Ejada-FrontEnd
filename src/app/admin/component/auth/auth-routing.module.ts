import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'roles/:id',
        component: EditRolesComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
