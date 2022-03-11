import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AccountService } from "../admin/services/account.service";
import { PhotoService } from "../admin/services/photo-service";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { VideoService } from "../admin/services/video-service";
import { NewsService } from "../admin/services/news-service";
import { EventsService } from "../admin/services/events-service";

const components: any = [
    UserComponent,
    HomeComponent
];
const Services: any = [AccountService, PhotoService,VideoService, NewsService, EventsService]
const guards: any = [];
const interceptors: any = [];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        UserRoutingModule,
        SharedModule,
        MdbCarouselModule        
    ],
    declarations: [
        ...components,
    ],
    providers: [
        ...guards,
        ...Services,
        ...interceptors

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
})

export class UserModule { }