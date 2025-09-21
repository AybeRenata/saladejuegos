import { Routes, Router } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { User } from './user/user';

import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take, filter } from 'rxjs/operators';

const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    filter((u) => u !== undefined),
    take(1),
    map((u) => {
      if (!u) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard as any] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'user', component: User, canActivate: [authGuard as any] },
  { path: '**', redirectTo: '' },
];
