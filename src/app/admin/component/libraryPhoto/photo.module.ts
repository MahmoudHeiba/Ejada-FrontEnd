import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoListComponent } from './list/photos-list.component';
import { PhotoComponent } from './photo.component';
import { AddEditDialogComponent } from './addEdit/add-edit-photo.component';




const components: any = [
  PhotoComponent,
  PhotoListComponent,
  AddEditDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    PhotoRoutingModule,
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
export class PhotoModule { }