import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout-btn',
  imports: [],
  templateUrl: './logout-btn.html',
  styleUrl: './logout-btn.css',
})
export class LogoutBtn {
  auth = inject(AuthService);
  logout() {
    this.auth.logout();
  }
}
