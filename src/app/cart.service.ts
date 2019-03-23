import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private selectedItems: { [key: number]: any} = {};
  cartUpdated: EventEmitter<any> = new EventEmitter();
  constructor() { }

  // add or update item
  addItem(item: any, quantity: number): void {
    let key = item['MenuItemID'];
    let selectedItem = this.selectedItems[key];
    // Check if item already exists and if so just add to quantity
    if (selectedItem != null && selectedItem != undefined) {
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
}
