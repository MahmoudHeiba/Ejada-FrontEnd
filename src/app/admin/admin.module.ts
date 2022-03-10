import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./component/login/login.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AuthAdminGuard } from "./gurades/auth.guard";
import { AuthLoginGuard } from "./gurades/login.guard";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { AuthAdminService } from "./services/auth-admin-service";
import { NewsService } from "./services/news-service";
import { EventsService } from "./services/events-service";
import { PhotoService } from "./services/photo-service";
import { VideoService } from "./services/video-service";
import { AccountService } from "./services/account.service";

const components: any =
  [
    AdminComponent,
    LoginComponent
  ];
const Services: any = [
  AuthAdminService,
  NewsService,
  EventsService,
  PhotoService,
  VideoService,
  AccountService
]
const guards: any = [AuthAdminGuard, AuthLoginGuard];
const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ...guards,
    ...Services,
    ...interceptors,
  ]
})

export class AdminModule { }