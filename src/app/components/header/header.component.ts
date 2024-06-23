import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  username: string | null = this.getUsername();
  date: Date = new Date();

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
  }

  getUsername(): string | null {
    let user = this.authService.getUsernameToken();
    return user;
  }

  onLogout() {
    this.authService.logout();
  }
}
