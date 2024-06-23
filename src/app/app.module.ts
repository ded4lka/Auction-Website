import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { PostingComponent } from './components/posting/posting.component';
import { FeedComponent } from './components/feed/feed.component';
import { ProductComponent } from './components/product/product.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from './components/auth/auth.module';
import { CartitemComponent } from './components/cartitem/cartitem.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './components/shared/services/users.service';
import { AuthService } from './components/shared/services/auth.service';
import { DropdownDirective } from './components/shared/directives/dropdown.directive';
import { FilterProductsPipe } from './components/shared/pipes/filter-cart-products.pipe';
import { FilterCartProductsPipe } from './components/shared/pipes/filter-products.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    PostingComponent,
    FeedComponent,
    ProductComponent,
    NavigationComponent,
    HeaderComponent,
    CartitemComponent,
    DropdownDirective,
    FilterProductsPipe,
    FilterCartProductsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
