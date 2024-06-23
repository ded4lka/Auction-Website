import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { IProduct } from '../shared/models/product';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{
  products: IProduct[] = this.productsService.products;

  constructor(public productsService: ProductsService){}
  
  ngOnInit(): void {
    this.productsService.getAllProducts().pipe().subscribe();
  }
}
