import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class User {
  private userService = inject(UserService);
  user$: Observable<any | null | undefined> = this.userService.userProfile$();
}
