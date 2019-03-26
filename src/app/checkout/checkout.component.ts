import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public selectedItems: any[] = [];
  public cards: any[];
  public displayedColumns = ['item', 'quantity', 'price', 'edit'];
  public tip = 0;
  public instructions = '';
  public selectedCard;
  @Input() username: string;

  constructor(private cartService: CartService, private http: HttpService) {
  }

  ngOnInit() {
    this.selectedItems = this.cartService.getSelectedItems();
    this.cartService.cartUpdated.subscribe((cart) => {
      this.selectedItems = this.cartService.getSelectedItems();
      if (this.selectedItems.length === 0) {
        this.selectedCard = '';
        this.instructions = '';
        this.tip = 0;
      }
    });
    this.http.getRequest('/getCreditCards', {CustomerUsername: this.username}).then((data) => {
      this.cards = data;
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

  checkout(): void {
    if (this.selectedItems.length === 0) {
      alert('cart empty');
      return;
    }
    if (this.selectedCard === null || this.selectedCard === undefined || this.selectedCard === '') {
      alert('please pick a credit card from the dropdown');
      return;
    }
    this.cartService.checkout(this.username, this.tip, this.instructions, this.selectedCard);
  }

  getDeliveryFee(): number {
    return this.cartService.getDeliveryFee();
  }

}
