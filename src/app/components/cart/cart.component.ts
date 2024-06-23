import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ProductsService } from '../shared/services/products.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  products: IProduct[] = this.productsService.products;
  cart: number[] = [];
  constructor(public productsService: ProductsService,
    public authService: AuthService
    ){}
  
  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.cart = JSON.parse(this.authService.getToken() as string).cart
    }
    this.productsService.getAllProducts().pipe().subscribe();
  }
}
