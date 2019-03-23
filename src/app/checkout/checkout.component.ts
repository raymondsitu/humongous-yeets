import {Component, Input, OnInit} from '@angular/core';
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
  @Input() username: string;

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
    return this.getTotalCost() + this.tip + this.getDeliveryFee();
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
    this.tip = 0;
  }

  checkout(): void {
    // send instructions as well
    this.cartService.checkout(this.username, this.tip);
    this.removeAll();
  }

  getDeliveryFee(): number {
    return this.cartService.getDeliveryFee();
  }

}
