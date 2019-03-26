import {Injectable, EventEmitter} from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private deliveryFee: number = null;
  private currentRestaurant: string = null;
  private selectedItems: { [key: number]: any} = {};
  cartUpdated: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpService) { }

  // add or update item
  addItem(item: any, quantity: number): void {
    let key = item['MenuItemID'];
    let selectedItem = this.selectedItems[key];
    // Check if item already exists and if so just add to quantity
    if (selectedItem != null && selectedItem !== undefined) {
      let currentQuantity = selectedItem['Quantity'];
      let newQuantity = currentQuantity + quantity;
      selectedItem['Quantity'] = newQuantity;
      this.selectedItems[key] = selectedItem;
    } else {
      item['Quantity'] = quantity;
      this.selectedItems[key] = item;
    }
    this.cartUpdated.emit(this.getSelectedItems());
  }

  // remove item from cart completely
  removeItem(itemID: number): void {
    delete this.selectedItems[itemID];
    this.cartUpdated.emit(this.getSelectedItems());
    if (Object.values(this.selectedItems).length === 0) {
      this.currentRestaurant = null;
      this.deliveryFee = 0;
    }
    this.cartUpdated.emit(this.getSelectedItems());
  }

  emptyCart(): void {
    this.selectedItems = {};
    this.deliveryFee = 0;
    this.currentRestaurant = null;
    this.cartUpdated.emit(this.getSelectedItems());
  }

  getSelectedItems(): any[] {
    return Object.values(this.selectedItems);
  }

  getTotalCost(): number {
    const prices = this.getSelectedItems().map((item) => item['Price'] * item['Quantity']);
    return prices.reduce((a, b) => a + b, 0);
  }

  getTotalNumberItems(): number {
    const quantity = this.getSelectedItems().map((item) => item['Quantity']);
    return quantity.reduce((a, b) => a + b, 0);
  }

  checkout(user: string, tip: number, instructions: string, card: any): void {
    const orderedItems = [];
    const info = {};
    for (const key of Object.keys(this.selectedItems)) {
      const item = {};
      item['MenuItemID'] = key;
      item['Quantity'] = this.selectedItems[key]['Quantity'];
      orderedItems.push(item);
    }
    info['Price'] = this.getTotalCost();
    info['TipAmount'] = tip;
    info['CustomerUsername'] = user;
    info['RestaurantID'] = this.currentRestaurant;
    info['SpecialInstructions'] = instructions;
    console.log(card);
    info['CreditCardNumber'] = card;
    const body: any = {RestaurantOrderedFrom: info, OrderedItems: orderedItems};
    this.http.postRequest('/addOrder', body)
      .then((res) => {
        alert('Your order has been successfully sent');
        this.emptyCart();
      })
      .catch((e) => {
          alert('order failed please check info again');
      }
      );
  }

  setDeliveryFee(restaurantID: string, fee: number): boolean {
    if (this.currentRestaurant === restaurantID || this.currentRestaurant === null) {
      this.currentRestaurant = restaurantID;
      this.deliveryFee = fee;
      return true;
    } else {
      return false;
    }
  }

  getDeliveryFee(): number {
    if (this.deliveryFee !== null) {
      return this.deliveryFee;
    } else {
      return 0;
    }
  }

}
