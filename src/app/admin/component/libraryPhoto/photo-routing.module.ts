import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo.component';
import { PhotoListComponent } from './list/photos-list.component';
// import { NewsListComponent } from './list/news-list.component';
 const routes: Routes = [
    {
        path: '',
        component: PhotoComponent,
        children: [
            {
                path: '',
                     component: PhotoListComponent,
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PhotoRoutingModule { }
