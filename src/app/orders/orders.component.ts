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
  orderedItems: MatTableDataSource<any>;
  displayedColumns = ['Date', 'OrderID', 'Status', 'DeliveryPersonName', 'Price'];
  orderedMenuItemsColumns = ['Name', 'Quantity', 'Price'];
  selected: {startDate: Moment, endDate: Moment};
  startDate: string;
  endDate:string;
  PriceAvg: string = "0";
  orderSelected: number;
  soldToAll: [];
  bestsellers: [];
  isResturant: boolean;

  constructor(private http: HttpService,private userService: UserService) {
  }

  searchOrdersBetween(): void {
  this.startDate = (this.selected? (this.selected.startDate).format("YYYY-MM-DD"): "");
  this.endDate = (this.selected? (this.selected.endDate).format("YYYY-MM-DD"): "");

  if(this.startDate != "" && this.endDate != ""){
  if(this.usertype === 'customer'){
    this.http.getRequest('/getOrdersBetween', {CustomerUsername: this.username, DateFrom: this.startDate, DateTo: this.endDate}).then((orders) => {
      if(typeof(orders) != "string"){
      this.orders = new MatTableDataSource(orders);
      } else {
      alert(orders);
      }
    }).catch((response) => {
      alert('No restaurants found');
    });

    this.http.getRequest('/getAvgOrder', {CustomerUsername: this.username, DateFrom: this.startDate, DateTo: this.endDate}).then((avg) => {
      if(typeof(avg) != "string"){
      console.log("avg", avg);
      this.PriceAvg = avg[0]['avgPrice'];
      }
    }).catch((response) => {
      alert('No restaurants found');
    });

    } else {
     this.http.getRequest('/getOrdersBetweenRestaurant', {RestaurantID: this.username, DateFrom: this.startDate, DateTo: this.endDate}).then((orders) => {
     if(typeof(orders) != "string"){
      this.orders = new MatTableDataSource(orders);
      }else {
      alert(orders);
      }
    }).catch((response) => {
      alert('No restaurants found');
    });

    this.http.getRequest('/getAvgOrderRestaurant', {RestaurantID: this.username, DateFrom: this.startDate, DateTo: this.endDate}).then((avg) => {
      if(typeof(avg) != "string"){
      console.log("avg", avg);
      this.PriceAvg = avg[0]['avgPrice'];
      }
    }).catch((response) => {
      alert('No restaurants found');
    });



    

    }
    }
  }

  selectOrder(orderID) {
    let numberOrderID = Number(orderID);
    if (numberOrderID == this.orderSelected) {
      this.orderSelected = undefined;
    } else {
      this.orderSelected = numberOrderID;
      this.http.getRequest('/getMenuItemsPerOrder', {OrderID: numberOrderID}).then((menuItems) => {
        this.orderedItems = new MatTableDataSource(menuItems);
      }).catch(() => {
        alert('No menu items found for order');
      });
    }
  }

  getTotalCostOfOrder() {
    if (this.orderSelected) {
      let sum: number = 0;
      for (let item of this.orderedItems.data) {
        sum += item['Price'] * item['Quantity']
      }
      return sum;
    }
  }

  getTotalQuantityOfOrder() {
    if (this.orderSelected) {
      let sum: number = 0;
      for (let item of this.orderedItems.data) {
        sum += item['Quantity']
      }
      return sum;
    }
  }

  getSoldByAll(){
  
  if(this.soldToAll){
  let lst: string = "";
  this.soldToAll.forEach(function(item) {
  lst = lst.concat(item['Name'] , ', ');
  });
  return lst;
  }
  
  }

    getBestSellers(){
    if(this.bestsellers){
  let lst: string = "";
  this.bestsellers.forEach(function(item) {
  lst = lst.concat(item['Name'] , '(', item['Total'], ')',', ');
  });
  return lst;
  }
  
  }

  ngOnInit() {
    this.usertype = this.userService.getUsertype();
    if (this.usertype !== 'admin') {
      this.user = this.userService.getUser();
      console.log("this.user", this.user);
      if (this.usertype === 'customer') {
      this.isResturant = false;
        this.username = this.user['CustomerUsername'];
      } else {
        this.username = this.user['RestaurantID'];
      }
    }

    if(this.usertype === 'restaurant'){
    this.isResturant = true;

         this.http.getRequest('/getSoldToAll', {RestaurantID: this.username}).then((items) => {
      this.soldToAll = items;
      
    }).catch((response) => {
      alert('No sold to all found');
    });

    this.http.getRequest('/getBestSellers', {RestaurantID: this.username}).then((items) => {
      this.bestsellers = items;
      
    }).catch((response) => {
      alert('No sold to all found');
    });
    }
  }
}
