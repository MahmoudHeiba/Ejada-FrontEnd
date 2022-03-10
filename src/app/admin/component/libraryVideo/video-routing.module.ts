import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VideoComponent } from './video.component';
import { VideoListComponent } from './list/video-list.component';
  const routes: Routes = [
    {
        path: '',
        component: VideoComponent,
        children: [
            {
                path: '',
                     component: VideoListComponent,
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VideoRoutingModule { }
