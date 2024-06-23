import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../shared/models/product';
import { AuthService } from '../shared/services/auth.service';
import { ProductsService } from '../shared/services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  userIsAdmin: boolean = this.authService.isUserAdmin();

  @Input() product: IProduct = {
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
    this.productForm = new FormGroup({
      'price': new FormControl(null, []),
    });
  }

  constructor(
    public router: Router,
    public authService: AuthService,
    public productsService: ProductsService
  ){}

  buyProduct() {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/auth']);
    }
    else{
    this.productsService.raiseThePrice(this.product, this.productForm.controls['price'].value).subscribe();
    window.location.reload();
    }
  }

  closeLot(){
    let tempCart: number[] = [];
    let testName: string;

    this.authService.getUserByName(this.product.lastUser).pipe().subscribe(user => {
        if(user){
          console.log("User пришёл нормально");
          tempCart = user[0].cart;

          console.log("Получена корзина пользователя ", this.product.lastUser, " : ", tempCart);
          this.productsService.deleteProduct(this.product, tempCart).subscribe();
        }
      })
      window.location.reload();
  }
}
