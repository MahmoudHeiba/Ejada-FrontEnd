import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './list/news-list.component';

const routes: Routes = [
    {
        path: '',
        component: NewsComponent,
        children: [
            {
                path: '',
                     component: NewsListComponent,
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NewsRoutingModule { }
