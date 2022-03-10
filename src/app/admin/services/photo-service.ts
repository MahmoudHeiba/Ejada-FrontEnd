import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Filters } from "src/app/shared/models/Filters";
import { ListResponse } from "src/app/shared/models/ListResponse";
import { IPhoto } from "src/app/shared/models/PhotoModel";
import { environment } from "src/environments/environment";

@Injectable()
export class PhotoService {
  private SERVER_API = environment.SERVER_API + '/Photo';

  constructor(private httpClient: HttpClient) {
  }

  post(data: IPhoto|any): Observable<IPhoto> {
      debugger
    const formData = new FormData();
    Object.keys(data).forEach((elm) => {
      if (data[elm] !== undefined && data[elm] !== null && data[elm] !== '') {
        formData.append(elm, data[elm]);
      }
    });

    return this.httpClient.post<IPhoto>(this.SERVER_API, formData);
  }

  GetAll(filters: Filters | any): Observable<ListResponse<IPhoto>> {
    let params = new HttpParams();
    Object.keys(filters).forEach((elm) => {
      if (filters[elm] !== undefined && filters[elm] !== null && filters[elm] !== '') {
        params = params.append(elm, filters[elm]);
      }
    });
    return this.httpClient.get<ListResponse<IPhoto>>(this.SERVER_API, { params });
  }

  remove(id: number): Observable<IPhoto> {
    return this.httpClient.delete<IPhoto>(this.SERVER_API + '/' + id);
  }
  activeItem(id: number, status: boolean): Observable<IPhoto> {
    return this.httpClient.put<IPhoto>(this.SERVER_API + '/active/' + id + '/' + status, null);
  }
}