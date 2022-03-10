import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { UserComponent } from "./user.component";



const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path:'',
                redirectTo:'home'
            }
        ]
    }
    // {
    //     path:'register',
    //     component:RegisterComponent
    // },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }