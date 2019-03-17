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
      '/getCustomer', { 'CustomerUsername' : this.username, 'CustomerPassword': this.password }
      ).then((res) => {
        if (res.response === 'Customer not found') {
          alert('Invalid username or password');
        } else {
          this.loggedin = true;
          return;
        }
    }).catch((e) => alert('Encounter error: ' + e.message));
  }
}
