import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/admin/services/events-service';
import { NewsService } from 'src/app/admin/services/news-service';
import { PhotoService } from 'src/app/admin/services/photo-service';
import { VideoService } from 'src/app/admin/services/video-service';
import { IEvent } from 'src/app/shared/models/EventModel';
import { Filters } from 'src/app/shared/models/Filters';
import { INews } from 'src/app/shared/models/NewsModel';
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
    videoSlider: IVideo | any;
    news: INews[] | undefined;
    events: IEvent[] | undefined;

    slides: any = [[]];


    constructor(private photoService: PhotoService,
        private videoSerive: VideoService,
        private newsService: NewsService,
        private eventsServices: EventsService,
        public sanitizer: DomSanitizer,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.photoService.GetAll(this.filters).subscribe(res => {
            if (res) {
                this.photoSlider = res.rows;
                this.slides = this.chunk(this.photoSlider, 3);
            }
        });

        this.videoSerive.GetAll(this.filters).subscribe(res => {
            if (res) {
                this.videoSlider = res.rows;
            }
        });

        this.newsService.GetAll(this.filters).subscribe(res => {
            if (res) {
                this.news = res.rows;
            }
        });

        this.eventsServices.GetAll(this.filters).subscribe(res => {
            if (res) {
                this.events = res.rows;
            }
        })
    }


    chunk(arr: any, chunkSize: any) {

        let R = [];
        for (let i = 0, len = arr.length; i < len; i += chunkSize) {
            R.push(arr.slice(i, i + chunkSize));
        }
        return R;
    }
}