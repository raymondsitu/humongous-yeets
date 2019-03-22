import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private selectedItems: { [key: number] : any} = {};

  constructor() { }

  // add or update item
  addItem(item: any, quantity: number): void {
    item['quantity'] = quantity;
    this.selectedItems[item['MenuItemID']] = item;
  }

  // remove item from cart completely
  removeItem(itemID: number): void {
    delete this.selectedItems[itemID];
  }

  getSelectedItems(): any[] {
    return Object.values(this.selectedItems);
  }

  getTotalCost(): number {
    const prices = this.getSelectedItems().map((item) => item['Price'] * item['quantity']);
    return prices.reduce((a, b) => a + b, 0);
  }
}
