import { Component } from '@angular/core';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'not poggers';

  constructor(private http: HttpService) {
    http.getRequest('/', {}).then((res) => this.title = res['response'] );
  }
}
