import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [privateGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'contact-list',
    loadComponent: () => import('./pages/contact-list/contact-list.page').then(m => m.ContactListPage),
    canActivate: [privateGuard]
  },
  {
    path: 'contact-detail/:id',
    loadComponent: () => import('./pages/contact-detail/contact-detail.page').then(m => m.ContactDetailPage),
    canActivate: [privateGuard]
  },
  {
    path: 'log-in',
    loadComponent: () => import('./pages/log-in/log-in.page').then(m => m.LogInPage),
    canActivate: [publicGuard]
  },
  {
    path: 'create-account',
    loadComponent: () => import('./pages/create-account/create-account.page').then(m => m.CreateAccountPage),
    canActivate: [publicGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings-page/settings-page.page').then( m => m.SettingsPagePage)
  }


];
