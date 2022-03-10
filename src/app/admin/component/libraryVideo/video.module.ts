import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {VideoRoutingModule } from './video-routing.module';
import { VideoComponent } from './video.component';
import { VideoListComponent } from './list/video-list.component';
import { AddEditDialogComponent } from './addEdit/add-edit-video.component';




const components: any = [
  VideoComponent,
  VideoListComponent,
  AddEditDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
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
export class VideoModule { }