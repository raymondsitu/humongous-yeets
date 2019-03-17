import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getRequest(url: string, param: any): any {
    const params = new HttpParams(param);
    return this.http.get(url, {params: params}).subscribe((res) => res );
  }

  postRequest(url: string, param: any): any {
    return this.http.post(url, param).subscribe((res) => res);
  }
}
