import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'catalog',
    loadComponent: () => import('./pages/catalog/catalog.page').then((m) => m.CatalogPage),
  },
  {
    path: 'program',
    loadComponent: () => import('./pages/program/program.page').then((m) => m.ProgramPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
