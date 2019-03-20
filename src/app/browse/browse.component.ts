import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../http.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  restaurantName: string;
  restaurants: MatTableDataSource<any[]>;
  displayedColumns = ['Name', 'Location', 'Category', 'Rating', 'DeliveryFee'];
  restaurantSelected = false;
  selectedRestaurantID = undefined;

  constructor(private http: HttpService) {
    http.getRequest('/getRestaurants', {}).then((restaurants) => {
      this.restaurants = new MatTableDataSource(restaurants);
      this.restaurants.sort = this.sort;
    })
  }

  searchRestaurants(): void {
    this.http.getRequest('/getRestaurantsFiltered', {Name: this.restaurantName}).then((restaurants) => {
      this.restaurants = new MatTableDataSource(restaurants);
      this.restaurants.sort = this.sort;
    }).catch((response) => {
      alert('No restaurants found');
    })
  }

  selectRestaurant(row: any) {
    // TODO: launch menu component when restaurant is selected with given row
    this.selectedRestaurantID = row['RestaurantID'];
    this.restaurantSelected = true;
  }

  disableMenu() {
    this.restaurantSelected = false;
  }

  ngOnInit() {

  }
}
