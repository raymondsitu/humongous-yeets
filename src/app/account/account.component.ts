import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  usertype: string;
  user: any;
  username: string;

  constructor(private http: HttpService,
              private userService: UserService) { }

  ngOnInit() {
    this.usertype = this.userService.getUsertype();
    if (this.usertype != 'admin') {
      this.user = this.userService.getUser();
      this.username = this.userService.getUser()['CustomerUsername'];
    }
  }

  getCustomerUsername() {
    if (this.usertype == 'customer') {
      return this.user['CustomerUsername'];
    }
  }

  getCustomerPassword() {
    if (this.usertype == 'customer') {
      return this.user['CustomerPassword'];
    }
  }

  getCustomerEmailAddress() {
    if (this.usertype = 'customer') {
      return this.user['EmailAddress'];
    }
  }

  getPhoneNumber() {
    if (this.usertype == 'customer') {
      return this.user['PhoneNumber'];
    }
  }

  getAddress() {
    if (this.usertype == 'customer') {
      return this.user['Address'];
    }
  }

  getRestaurantID() {
    if (this.usertype == 'restaurant') {
      return this.user['RestaurantID'];
    }
  }

  getName() {
    if (this.usertype == 'restaurant') {
      return this.user['Name'];
    }
  }

  getLocation() {
    if (this.usertype == 'restaurant') {
      return this.user['Location'];
    }
  }

  getCategory() {
    if (this.usertype == 'restaurant') {
      return this.user['Category'];
    }
  }

  getRating() {
    if (this.usertype == 'restaurant') {
      return this.user['Rating'];
    }
  }

  getDeliveryFee() {
    if (this.usertype == 'restaurant') {
      return this.user['DeliveryFee'];
    }
  }

  getRestaurantPassword() {
    if (this.usertype == 'restaurant') {
      return this.user['RestaurantPassword'];
    }
  }
}
