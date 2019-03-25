import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../http.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {CartService} from '../cart.service';
import {Moment} from 'moment';
import {UserService} from '../user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;


  usertype: string;
  user: any;
  username: string;
  orders: MatTableDataSource<any>;
  displayedColumns = ['Date', 'OrderID', 'Status', 'DeliveryPersonName', 'Price'];
  selected: {startDate: Moment, endDate: Moment};
  startDate: string;
  endDate:string;

  constructor(private http: HttpService,private userService: UserService) {
  }

  searchOrdersBetween(): void {
  this.startDate = (this.selected? (this.selected.startDate).format("YYYY-MM-DD"): "2019-01-10");
  this.endDate = (this.selected? (this.selected.endDate).format("YYYY-MM-DD"): "2019-01-10");

  if(this.usertype === 'customer'){
    this.http.getRequest('/getOrdersBetween', {CustomerUsername: this.username, DateFrom: this.startDate, DateTo: this.endDate}).then((orders) => {
      this.orders = new MatTableDataSource(orders);
    }).catch((response) => {
      alert('No restaurants found');
    });
    } else {
     this.http.getRequest('/getOrdersBetweenRestaurant', {RestaurantID: this.username, DateFrom: this.startDate, DateTo: this.endDate}).then((orders) => {
      this.orders = new MatTableDataSource(orders);
    }).catch((response) => {
      alert('No restaurants found');
    });

    }
  }

  ngOnInit() {
    this.usertype = this.userService.getUsertype();
    if (this.usertype !== 'admin') {
      this.user = this.userService.getUser();
      console.log("this.user", this.user);
      if (this.usertype === 'customer') {
        this.username = this.user['CustomerUsername'];
      } else {
        this.username = this.user['RestaurantID'];
      }
    }
  }
}
