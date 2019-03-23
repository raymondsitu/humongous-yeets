import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../http.service';
import {UserService} from '../user.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  usertype: string;
  user: any;
  username: string;
  menu: any;
  menuItems: MatTableDataSource<any>;
  showMenu: boolean = false;
  displayedColumns = ['Name', 'Description', 'Calories', 'Price', 'Update', 'Delete'];
  newItem: any = {};

  constructor(private http: HttpService,
              private userService: UserService) { }

  ngOnInit() {
    this.usertype = this.userService.getUsertype();
    if (this.usertype !== 'admin') {
      this.user = this.userService.getUser();
      if (this.usertype === 'customer') {
        this.username = this.userService.getUser()['CustomerUsername'];
      } else {
        this.username = this.userService.getUser()['Name'];
        this.http.getRequest('/getMenu', { RestaurantID: this.user['RestaurantID'] }).then( (result) => {
          this.menu = result[0];
          this.menuItems = new MatTableDataSource(this.menu['MenuItems']);
          this.menuItems.sort = this.sort;
        }).catch((response) => {
          alert('No menu found');
        });
      }
    }
  }

  updateAccount() {
    this.http.putRequest('/updateCustomer', this.user).then((res) => {
      alert('Updated');
    }).catch((res) => {
      alert('Error occured, try again later');
    });
  }

  updateRestaurant() {
    const newPW = Number(this.user['RestaurantPassword']);
    if (isNaN(newPW) || newPW >= 1000000) {
      alert('New password must be at most 6 numbers long and cannot contain characters other than 0-9');
      return;
    }
    this.user['RestaurantPassword'] = newPW;
    this.http.putRequest('/updateRestaurant', this.user).then((res) => {
      alert('Updated');
    }).catch((res) => {
      alert('Error occured, try again later');
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu == true) {
      // Refetch menu
      this.http.getRequest('/getMenu', { RestaurantID: this.user['RestaurantID'] }).then( (result) => {
        this.menu = result[0];
        this.menuItems = new MatTableDataSource(this.menu['MenuItems']);
        this.menuItems.sort = this.sort;
      }).catch((response) => {
        alert('No menu found');
      });
    }
  }

  updateMenuItem(row) {
    // console.log(row);
    this.http.putRequest('/updateMenuItem', row).then((res) => {
      alert('Updated');
    }).catch((res) => {
      alert('Error occurred, try again later');
    });
  }

  deleteMenuItem(menuItemID) {
    this.http.deleteRequest('/deleteMenuItem', { MenuItemID: menuItemID }).then(() => {
      alert('Deleted');
    }).catch(() => {
      alert('Error occurred, try again later');
    });  }

  addNewItem() {
    // console.log(this.newItem);
    this.newItem['MenuID'] = this.menu['MenuID'];
    this.http.postRequest('/addMenuItem', this.newItem).then(() => {
      alert('Added');
    }).catch(() => {
      alert('Error occurred, try again later');
    });
  }
}
