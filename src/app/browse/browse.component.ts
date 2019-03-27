import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../http.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  restaurantName: string;
  restaurants: MatTableDataSource<any>;
  displayedColumns = ['Name', 'Location', 'Category', 'Rating', 'DeliveryFee'];
  restaurantSelected = false;
  selectedRestaurantID = undefined;
  deliveryFee = null;
  col1 = true;
  col2 = true;
  col3 = true;
  col4 = true;
  col5 = true;

  constructor(private http: HttpService) {
    this.getRestaurants();
  }

  searchRestaurants(): void {
    this.http.getRequest('/getRestaurantsFiltered', {Name: this.restaurantName, selected: this.displayedColumns}).then((restaurants) => {
      this.restaurants = new MatTableDataSource(restaurants);
      this.restaurants.sort = this.sort;
    }).catch((response) => {
      alert('No restaurants found');
    });
  }

  selectRestaurant(row: any) {
    // TODO: launch menu component when restaurant is selected with given row
    this.selectedRestaurantID = row['RestaurantID'];
    this.deliveryFee = row['DeliveryFee'];
    this.restaurantSelected = true;
  }

  disableMenu() {
    this.restaurantSelected = false;
  }

  ngOnInit() {
  }

  getRestaurants() {
    this.updateCols();
    this.http.getRequest('/getRestaurants', {selected: this.displayedColumns}).then((restaurants) => {
      this.restaurants = new MatTableDataSource(restaurants);
      this.restaurants.sort = this.sort;
    });
  }

  updateCols() {
    let result = [];
    if (this.col1 === true) {
      result.push('Name');
    }
    if (this.col2 === true) {
      result.push('Location');
    }
    if (this.col3 === true) {
      result.push('Category');
    }
    if (this.col4 === true) {
      result.push('Rating');
    }
    if (this.col5 === true) {
      result.push('DeliveryFee');
    }
    this.displayedColumns = result;
  }
}
