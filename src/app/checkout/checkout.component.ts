import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public selectedItems: any[] = [];
  public displayedColumns = ['item', 'quantity', 'price'];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.selectedItems = this.cartService.getSelectedItems();
    this.cartService.cartUpdated.subscribe((cart) => {
      this.selectedItems = this.cartService.getSelectedItems();
    });
  }

  getTotalCost(): number {
    return this.cartService.getTotalCost();
  }

  getItemCount(): number {
    return this.selectedItems.length;
  }

}
