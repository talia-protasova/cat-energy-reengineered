import { Component } from '@angular/core';
import { PromoComponent } from './sections/promo/promo.component';
import { CategoriesComponent } from './sections/categories/categories.component';

@Component({
  selector: 'app-home',
  imports: [PromoComponent, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
