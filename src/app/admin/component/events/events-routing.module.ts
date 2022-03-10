import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import { NewsListComponent } from './list/news-list.component';
import { EventsComponent } from './events.component';
import { EventListComponent } from './list/events-list.component';

const routes: Routes = [
    {
        path: '',
        component: EventsComponent,
        children: [
            {
                path: '',
                     component: EventListComponent,
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NewsRoutingModule { }
