// src/app/auth/auth.routes.ts
import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';

export const authRoutes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
