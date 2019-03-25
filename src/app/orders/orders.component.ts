import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../http.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {CartService} from '../cart.service';
import {Moment} from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  CustomerUsername: string = "rsitu";
  orders: MatTableDataSource<any>;
  displayedColumns = ['Date', 'OrderID', 'Status', 'DeliveryPersonName', 'Price'];
  selected: {startDate: Moment, endDate: Moment};
  startDate: string;
  endDate:string;

  constructor(private http: HttpService) {
    this.http.getRequest('/getOrdersBetween', {CustomerUsername: this.CustomerUsername, DateFrom: "2019-01-10", DateTo: "2019-03-10"}).then((orders) => {
      this.orders = new MatTableDataSource(orders);
    });
    console.log("wthy");
  }

  searchOrdersBetween(): void {
  console.log("waesfaefaweawefawefaew");
  this.startDate = (this.selected? (this.selected.startDate).format("YYYY-MM-DD"): "2019-01-10");
  this.endDate = (this.selected? (this.selected.endDate).format("YYYY-MM-DD"): "2019-01-10");
    this.http.getRequest('/getOrdersBetween', {CustomerUsername: this.CustomerUsername, DateFrom: this.startDate, DateTo: this.endDate}).then((orders) => {
      this.orders = new MatTableDataSource(orders);
    }).catch((response) => {
      alert('No restaurants found');
    });
  }

  ngOnInit() {

  }
}
