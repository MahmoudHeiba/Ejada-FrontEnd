import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './list/news-list.component';
import { AddEditDialogComponent } from './addEdit/add-edit-news.component';




const components :any = [
    NewsComponent,
    NewsListComponent,
    AddEditDialogComponent
];
 
@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule
  ],
  declarations: [
    ...components,
  ],
  providers: [
   
  ],
  entryComponents: [
    AddEditDialogComponent
  ]
})
export class NewsModule { }