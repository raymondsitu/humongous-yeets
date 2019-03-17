import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getRequest(url: string, param: any): Promise<any> {
    const params = new HttpParams(param);
    return this.http.get(url, {params: params}).toPromise();
  }

  postRequest(url: string, param: any): Promise<any> {
    return this.http.post(url, param).toPromise();
  }
}
