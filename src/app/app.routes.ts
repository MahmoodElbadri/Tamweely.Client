import { Routes } from '@angular/router';
import {RegisterComponent} from './auth/components/register/register.component';
import {authGuard} from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'address',
    canActivate: [authGuard],
    loadChildren:()=>import('./features/address-book/address-book.module').then(m => m.AddressBookModule),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
