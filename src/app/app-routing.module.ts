import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('src/app/pages/user.module').then(m => m.UserModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
