import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../shared/models/product';
import { AuthService } from '../shared/services/auth.service';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {


  @Input() cartitem: IProduct = {
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    endDate: new Date(),
    price: 0,
    isBought: false,
    lastUser: "",
  }

  ngOnInit(): void {
  }

  constructor(
    public router: Router,
    public authService: AuthService,
    public productsService: ProductsService
  ){}

  getItem(){}
}