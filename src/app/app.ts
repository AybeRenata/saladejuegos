import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { User } from './user/user';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Login, User],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('juegos');
}
