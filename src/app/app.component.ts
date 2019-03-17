import { Component } from '@angular/core';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedin = false;
  username: string;
  password: string;

  constructor(private http: HttpService) {
    http.getRequest('/', {}).then((res) => console.log(res['response']) );
  }

  // todo make http request
  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.loggedin = true;
    } else {
      alert('Invalid username or password');
    }

  }
}
