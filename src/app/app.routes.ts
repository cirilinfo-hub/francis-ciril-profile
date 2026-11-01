import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Francis Ciril Arulsamy | Front-End Architect & Angular Architect',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  { path: '**', redirectTo: '' },
];
