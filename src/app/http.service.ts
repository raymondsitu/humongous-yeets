import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

const baseUrl = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  getRequest(url: string, param: any): Promise<any> {
    const params = new HttpParams({fromObject: param});
    return this.http.get(baseUrl + url, {params: params}).toPromise();
  }

  postRequest(url: string, body: any): Promise<any> {
    const formParam = new HttpParams({fromObject: body});
    return this.http.post(baseUrl + url, body).toPromise();
  }

  putRequest(url: string, body: any): Promise<any> {
    return this.http.put(baseUrl + url, body).toPromise()
  }

  deleteRequest(url: string, param: any): Promise<any> {
    const params = new HttpParams({fromObject: param});
    return this.http.delete(baseUrl + url, {params: params}).toPromise();
  }
}
