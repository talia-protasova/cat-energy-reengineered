import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ShowMoreItemComponent } from '../show-more-item/show-more-item.component';
import { PRODUCTS } from '../../../../core/data/products.data';

@Component({
  selector: 'app-catalog-list',
  imports: [CommonModule, ProductCardComponent, ShowMoreItemComponent],
  templateUrl: './catalog-list.component.html',
  styleUrl: './catalog-list.component.scss',
})
export class CatalogListComponent {
  products = PRODUCTS;
}
