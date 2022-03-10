import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEvent } from "src/app/shared/models/EventModel";
import { Filters } from "src/app/shared/models/Filters";
import { ListResponse } from "src/app/shared/models/ListResponse";
import { environment } from "src/environments/environment";

@Injectable()
export class EventsService {
    private SERVER_API = environment.SERVER_API + '/Events';

    constructor(private httpClient: HttpClient) {
    }

    post(data: IEvent): Observable<IEvent> {
        return this.httpClient.post<IEvent>(this.SERVER_API , data);
    }

    GetAll(filters: Filters | any): Observable<ListResponse<IEvent>> {
        let params = new HttpParams();
        Object.keys(filters).forEach((elm) => {
            if (filters[elm] !== undefined && filters[elm] !== null && filters[elm] !== '') {
                params = params.append(elm, filters[elm]);
            }
        });
        return this.httpClient.get<ListResponse<IEvent>>(this.SERVER_API, { params });
    }

    remove(id: number): Observable<IEvent> {
        return this.httpClient.delete<IEvent>(this.SERVER_API + '/' + id);
    }
    activeItem(id: number, status: boolean): Observable<IEvent> {
        return this.httpClient.put<IEvent>(this.SERVER_API + '/active/' + id + '/' + status, null);
    }
}