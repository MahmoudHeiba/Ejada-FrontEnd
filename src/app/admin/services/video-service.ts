import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Filters } from "src/app/shared/models/Filters";
import { ListResponse } from "src/app/shared/models/ListResponse";
import { IVideo } from "src/app/shared/models/VideoModel";
import { environment } from "src/environments/environment";

@Injectable()
export class VideoService {
  private SERVER_API = environment.SERVER_API + '/Video';

  constructor(private httpClient: HttpClient) {
  }

  post(data: IVideo|any): Observable<IVideo> {
    const formData = new FormData();
    Object.keys(data).forEach((elm) => {
      if (data[elm] !== undefined && data[elm] !== null && data[elm] !== '') {
        formData.append(elm, data[elm]);
      }
    });

    return this.httpClient.post<IVideo>(this.SERVER_API, formData);
  }

  GetAll(filters: Filters | any): Observable<ListResponse<IVideo>> {
    let params = new HttpParams();
    Object.keys(filters).forEach((elm) => {
      if (filters[elm] !== undefined && filters[elm] !== null && filters[elm] !== '') {
        params = params.append(elm, filters[elm]);
      }
    });
    return this.httpClient.get<ListResponse<IVideo>>(this.SERVER_API, { params });
  }

  remove(id: number): Observable<IVideo> {
    return this.httpClient.delete<IVideo>(this.SERVER_API + '/' + id);
  }
  activeItem(id: number, status: boolean): Observable<IVideo> {
    return this.httpClient.put<IVideo>(this.SERVER_API + '/active/' + id + '/' + status, null);
  }
}