import { Component } from '@angular/core';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { AddMoreComponent } from './components/add-more/add-more.component';

@Component({
  selector: 'app-catalog',
  imports: [CatalogListComponent, AddMoreComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {}
