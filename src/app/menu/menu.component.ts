import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  selectedItems: any[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.selectedItems = this.cartService.getSelectedItems();
  }

  // to add/remove items to cart use cartService

}
