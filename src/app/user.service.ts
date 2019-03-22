import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usertype: string;
  private user: any;

  constructor() {}

  setUsertype(usertype) {
    this.usertype = usertype
  }

  setUser(user) {
    this.user = user;
  }

  getUsertype() {
    return this.usertype
  }

  getUser() {
    return this.user;
  }
}
