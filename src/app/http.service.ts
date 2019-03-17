import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

const baseUrl = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getRequest(url: string, param: any): Promise<any> {
    const params = new HttpParams(param);
    return this.http.get(baseUrl + url, {params: params}).toPromise();
  }

  postRequest(url: string, param: any): Promise<any> {
    return this.http.post(baseUrl + url, param).toPromise();
  }
}
