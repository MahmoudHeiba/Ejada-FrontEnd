import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from './list/events-list.component';
import { AddEditDialogComponent } from './addEdit/add-edit-events.component';




const components :any = [
  EventsComponent,
    EventListComponent,
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
export class EventsModule { }