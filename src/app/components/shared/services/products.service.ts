import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, delay, retry, tap } from 'rxjs';
import { IUser, IUserRole } from '../models/user';
import { IProduct } from "../models/product";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    products: IProduct[] = [];

    product: IProduct = {
        id: 0,
        title: "",
        description: "",
        imageUrl: "",
        endDate: new Date(),
        price: 0,
        isBought: false,
        lastUser: "",
    };

    getAllProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>('http://localhost:3000/products').pipe(
            delay(304),
            retry(2),
            tap(products => this.products = products)
        )
    }

    addProduct(productInfo: { id: number, title: string, description: string,
                              imageUrl: string, endDate: Date, price: number,
                              isBought: boolean, lastUser: string }) : Observable<IProduct>{
        this.product = {
            id: 0,
            title: productInfo.title,
            description: productInfo.description,
            imageUrl: productInfo.imageUrl,
            endDate: productInfo.endDate,
            price: productInfo.price,
            isBought: false,
            lastUser: "",
        }

        return this.http.post<IProduct>(`http://localhost:3000/products`, this.product);
    }

    raiseThePrice(product: { id: number, title: string, description: string,
                            imageUrl: string, endDate: Date, price: number,
                                isBought: boolean, lastUser: string }, value: number) : Observable<IProduct> {
        this.product = product;
        this.product.price = +this.product.price + value;
        this.product.lastUser = this.authService.getUsernameToken();
        let id:number = this.product.id;
        console.log("Trying to PUT a product with id:", this.product.id, " and new price: ", this.product.price);
        console.log(this.product);
        return this.http.put<IProduct>(`http://localhost:3000/products/${this.product.id}`, this.product)
    }

    
    deleteProduct(product: { id: number, title: string, description: string,
        imageUrl: string, endDate: Date, price: number,
            isBought: boolean, lastUser: string }, cart: number[]){
                this.product = product;
                this.product.isBought = true;

                console.log("Пробуем добавить продукт с id " , this.product.id, " в корзину ", cart, " пользователя ", this.product.lastUser);
                this.authService.addProductToCart(this.product.id, this.product.lastUser, cart);

                
                return this.http.put<IProduct>(`http://localhost:3000/products/${this.product.id}`, this.product)
    }
}