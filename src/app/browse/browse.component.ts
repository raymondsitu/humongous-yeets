import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  restaurantName: string;
  restaurants: any[];
  displayedColumns = ['Name', 'Location', 'Category', 'Rating', 'DeliveryFee'];

  constructor(private http: HttpService) {
    http.getRequest('/getRestaurants', {}).then((restaurants) => {
      this.restaurants = restaurants;
    })
  }

  searchRestaurants(): void {
    this.http.getRequest('/getRestaurantsFiltered', {Name: this.restaurantName}).then((restaurants) => {
      this.restaurants = restaurants;
    }).catch((response) => {
      alert('No restaurants found');
    })
  }

  ngOnInit() {
  }

}
