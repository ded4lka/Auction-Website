import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {

  postForm: FormGroup;
  errorMessage: string = "";
  townPattern: string = "[А-ЯЁ][-А-яЁё]+";
  phonePattern: string = "[7-8]{1}[0-9]{10}";
  productNamePattern: string = "[А-ЯЁ][-А-яЁё]+";

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router, 
    ) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'town': new FormControl(null, [Validators.required, Validators.minLength(3),
                                    Validators.maxLength(30), Validators.pattern(this.townPattern)]),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(11),
                                    Validators.maxLength(11), Validators.pattern(this.phonePattern)]),
      'title': new FormControl(null, [Validators.required, Validators.pattern(this.productNamePattern),
                                            Validators.minLength(3), Validators.maxLength(20)]),
      'description': new FormControl(null, [Validators.required]),
      'imageUrl': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required, Validators.pattern("[0-9]")]),
      'endDate': new FormControl()
    })
  }

  onSubmit() {
    this.productsService.addProduct(this.postForm.value).subscribe(product => {
      this.router.navigate(['']);
    })
  }
}
