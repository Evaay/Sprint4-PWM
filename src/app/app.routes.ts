import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'contact-list',
    loadComponent: () => import('./pages/contact-list/contact-list.page').then( m => m.ContactListPage)
  },
  {
    path: 'contact-detail/:id',
    loadComponent: () => import('./pages/contact-detail/contact-detail.page').then( m => m.ContactDetailPage)
  },
];
