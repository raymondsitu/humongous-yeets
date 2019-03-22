import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private selectedItems: { [key: number] : any} = {};

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
    }

  // remove item from cart completely
  removeItem(itemID: number): void {
    delete this.selectedItems[itemID];
  }

  getSelectedItems(): any[] {
    return Object.values(this.selectedItems);
  }

  getTotalCost(): number {
    const prices = this.getSelectedItems().map((item) => item['Price'] * item['Quantity']);
    return prices.reduce((a, b) => a + b, 0);
  }
}
