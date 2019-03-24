import {HttpService} from './http.service';
import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from './user.service';
import {CartService} from './cart.service';

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

  constructor(private http: HttpService,
              private userService: UserService,
              private cartService: CartService) {
    // http.getRequest('/', {}).then((res) => console.log(res['response']) );
  }

  login(): void {
    // todo remove this when we deploy to production
    if (this.username === 'admin' && this.password === 'admin') {
      this.loggedin = true;
      this.userService.setUsertype('admin');
      return;
    }
    this.http.getRequest(
      '/login', { 'username' : this.username, 'password': this.password }
      ).then((res) => {
        // console.log(res);
        if (res.response === 'not found') {
          alert('Invalid username or password');
        } else {
          this.loggedin = true;
          this.usertype = res[0];
          this.userService.setUsertype(res[0]);
          this.userService.setUser(res[1]);
        }
    }).catch((e) => alert('Encounter error: ' + e.message));
  }

  getNumItems(): number {
    return this.cartService.getTotalNumberItems();
  }
}
