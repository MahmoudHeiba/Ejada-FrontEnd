import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Filters } from "src/app/shared/models/Filters";
import { ListResponse } from "src/app/shared/models/ListResponse";
import { INews } from "src/app/shared/models/NewsModel";
import { environment } from "src/environments/environment";

@Injectable()
export class NewsService {
  private SERVER_API = environment.SERVER_API + '/News';

  constructor(private httpClient: HttpClient) {
  }

  postNews(data: INews): Observable<INews> {
    return this.httpClient.post<INews>(this.SERVER_API + '/createNews', data);
  }

  GetAll(filters: Filters | any): Observable<ListResponse<INews>> {
    let params = new HttpParams();
    Object.keys(filters).forEach((elm) => {
      if (filters[elm] !== undefined && filters[elm] !== null && filters[elm] !== '') {
        params = params.append(elm, filters[elm]);
      }
    });
    return this.httpClient.get<ListResponse<INews>>(this.SERVER_API, { params });
  }

  remove(id: number): Observable<INews> {
    return this.httpClient.delete<INews>(this.SERVER_API + '/' + id);
  }
  activeItem(id: number, status: boolean): Observable<INews> {
    return this.httpClient.put<INews>(this.SERVER_API + '/active/' + id + '/' + status, null);
  }
}