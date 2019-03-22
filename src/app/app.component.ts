import {HttpService} from './http.service';
import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  loggedin = false;
  username: string;
  password: string;
  usertype: string;

  constructor(private http: HttpService) {
    http.getRequest('/', {}).then((res) => console.log(res['response']) );
  }

  login(): void {
    // todo remove this when we deploy to production
    if (this.username === 'admin' && this.password === 'admin') {
      this.loggedin = true;
      return;
    }
    this.http.getRequest(
      '/login', { 'username' : this.username, 'password': this.password }
      ).then((res) => {
        console.log(res);
        if (res.response === 'not found') {
          alert('Invalid username or password');
        } else {
          this.loggedin = true;
          this.usertype = res[0];
          return;
        }
    }).catch((e) => alert('Encounter error: ' + e.message));
  }
}
