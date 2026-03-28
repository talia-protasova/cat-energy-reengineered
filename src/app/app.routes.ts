import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: { headerVariant: 'index' },
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('./pages/catalog/catalog.component').then(
        (m) => m.CatalogComponent,
      ),
    data: { headerVariant: 'default' },
  },
  {
    path: 'program-selection',
    loadComponent: () =>
      import('./pages/program-selection/program-selection.component').then(
        (m) => m.ProgramSelectionComponent,
      ),
    data: { headerVariant: 'default' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
