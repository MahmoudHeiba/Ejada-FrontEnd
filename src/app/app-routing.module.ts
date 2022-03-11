import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './utilities/auth.guard';

const routes: Routes = [
  { path: 'signUp', component: RegisterComponent },
  { path: 'signIn', component: LoginComponent },

  { path: '', redirectTo: 'user', pathMatch: 'full'},
  { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule), canActivate:[AuthGuard] },
  { path: 'user', loadChildren: () => import('src/app/pages/user.module').then(m => m.UserModule), canActivate:[AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
