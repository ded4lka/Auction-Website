import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  errorMessage: string = "";
  isLoad: boolean = true;
  usernamePattern: string = '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$';

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(this.usernamePattern)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate([''])
    // }
  }
  
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(user => {
      if (user) {
        if (user[0].password !== this.loginForm.value.password) {
          console.log("Ошибка входа")
          this.errorMessage = "Неверный пароль"
        }
      }

      while (!this.authService.isLoggedIn()) {
        this.isLoad = false;
      }
      this.router.navigate([''])
      this.isLoad = true;
    })
  }
}
