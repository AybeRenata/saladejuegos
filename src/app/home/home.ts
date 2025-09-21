import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { LogoutBtn } from '../logout-btn/logout-btn';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, User, LogoutBtn],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  isLoggedIn: boolean = true;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }
}
