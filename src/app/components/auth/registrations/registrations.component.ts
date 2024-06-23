import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {

  registrationForm!: FormGroup;
  // private cyrillicNamePattern : string = '^[а-яА-ЯёЁ]+$';
  errorMessage: string = "";
  isLoad: boolean = true;
  usernamePattern: string = '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$';
  emailPattern: string = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern(this.usernamePattern)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'email': new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)])
    });
    // if(this.authService.isLoggedIn()){
    //   this.router.navigate(['']);
    // }
  }
  
  onSubmit() {
    this.authService.register(this.registrationForm.value).subscribe(() => {
      while (!this.authService.isLoggedIn()) {
        this.isLoad = false;
      }
      this.router.navigate(['']);
      this.isLoad = true;
    })
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
  }
  
}
