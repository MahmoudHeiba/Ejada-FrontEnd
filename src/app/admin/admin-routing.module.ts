import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { AdminComponent } from "./admin.component";
import { AuthAdminGuard } from "./gurades/auth.guard";
import { AuthLoginGuard } from "./gurades/login.guard";


const routes: Routes = [{
    path: '',
    component: AdminComponent,
    canActivate: [AuthAdminGuard] ,
    children: [
        {
          path: 'news',
          data: { roles: ['admin'] },
          canActivate: [AuthAdminGuard],
          loadChildren: () => import('src/app/admin/component/news/news.module').then(m => m.NewsModule)
        },
        {
            path:'event',
            canActivate:[AuthAdminGuard],
            data:{roles:['admin']},
            loadChildren:()=>import('src/app/admin/component/events/events.module').then(m=>m.EventsModule)
        },
        {
            path:'photo',
            canActivate:[AuthAdminGuard],
            data:{roles:['admin']},
            loadChildren:()=>import('src/app/admin/component/libraryPhoto/photo.module').then(m=>m.PhotoModule)
        },
        {
            path:'video',
            canActivate:[AuthAdminGuard],
            data:{roles:['admin']},
            loadChildren:()=>import('src/app/admin/component/libraryVideo/video.module').then(m=>m.VideoModule)
        },
        {
            path: 'auth',
            data: { roles: ['admin'] },
            canActivate: [AuthAdminGuard],
            loadChildren: () => import('src/app/admin/component/auth/auth.module').then(m => m.AuthModule)
          },
        {
            path:'',
            redirectTo:'news'
        }
    ]
},
{
    path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard]
},
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }