import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { ActiveDialogComponent } from './dialogs/active/active.dialog.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
  AuthComponent,
  EditRolesComponent,
  UserListComponent,
  EditDialogComponent,
  ActiveDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    ...components,
  ],
  providers: [
   
  ],
  entryComponents: [
    EditDialogComponent,
    ActiveDialogComponent
  ]
})
export class AuthModule { }
