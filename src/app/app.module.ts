import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { MenuComponent } from './menu/menu.component';
import { AccountComponent } from './account/account.component';
import { BrowseComponent } from './browse/browse.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatTabsModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    MenuComponent,
    AccountComponent,
    BrowseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
