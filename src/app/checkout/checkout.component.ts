import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public selectedItems: any[] = [];
  public displayedColumns = ['item', 'quantity', 'price', 'edit'];
  public tip = 0;
  public instructions: string;

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

  getFinalCost(): number {
    return this.getTotalCost() + this.tip;
  }

  getItemCount(): number {
    return this.cartService.getTotalNumberItems();
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
  }

  removeAll(): void {
    this.cartService.emptyCart();
    this.selectedItems = [];
  }

  checkout(): void {
    // send instructions as well
    this.removeAll();
    this.cartService.checkout();
  }

}
