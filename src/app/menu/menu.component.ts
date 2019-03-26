import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CartService} from '../cart.service';
import {HttpService} from '../http.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @Input() restaurantID: string;
  @Input() deliveryFee: number;
  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

  selectedItems: any[] = [];
  menu: any;
  menuItems: MatTableDataSource<any>;
  displayedColumns = ['Name', 'Description', 'Calories', 'Price', 'Quantity', 'Add'];

  constructor(private cartService: CartService,
              private http: HttpService) {
  }

  ngOnInit() {
    this.selectedItems = this.cartService.getSelectedItems();
    this.http.getRequest('/getMenu', { RestaurantID: this.restaurantID }).then( (result) => {
      this.menu = result[0];
      this.menuItems = new MatTableDataSource(this.menu['MenuItems']);
      this.menuItems.sort = this.sort;
    }).catch((response) => {
      alert('No menu found');
    });
  }

  goBack() {
    this.onBack.emit();
  }

  addToCart(row: any, quantity: string) {
    let amount = +quantity;
    const result: boolean = this.cartService.setDeliveryFee(this.restaurantID, this.deliveryFee);
    if (result) {
      if (!isNaN(amount)) {
        this.cartService.addItem(row, amount);
      }
    } else {
      alert('Please checkout before ordering from another restaurant');
    }
  }

  // to add/remove items to cart use cartService

}
