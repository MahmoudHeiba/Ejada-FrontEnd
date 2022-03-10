import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PhotoService } from 'src/app/admin/services/photo-service';
import { VideoService } from 'src/app/admin/services/video-service';
import { Filters } from 'src/app/shared/models/Filters';
import { IPhoto } from 'src/app/shared/models/PhotoModel';
import { IVideo } from 'src/app/shared/models/VideoModel';


@Component({
    selector: 'app-user',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isLoading: boolean = false;
    filters = new Filters();
    photoSlider: IPhoto | any;
    videoSlider:IVideo| any;

    slides: any = [[]];
  

    constructor(private photoService: PhotoService, 
        private videoSerive: VideoService,
        private toastr: ToastrService) { }

    ngOnInit() {        
       this.loadData();
    }
    
    loadData(){
        this.photoService.GetAll(this.filters).subscribe(res=>{
            if(res){
                debugger
                this.photoSlider = res.rows;
                this.slides = this.chunk(this.photoSlider, 3);
            }
         });

         this.videoSerive.GetAll(this.filters).subscribe(res=>{
            if(res){
                this.videoSlider = res.rows;
            }
         });
    }


    chunk(arr:any, chunkSize:any) {
        
        let R = [];
        for (let i = 0, len = arr.length; i < len; i += chunkSize) {
          R.push(arr.slice(i, i + chunkSize));
        }
        return R;
      }
}