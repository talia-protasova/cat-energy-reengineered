import { Component } from '@angular/core';
import { PromoComponent } from './sections/promo/promo.component';
import { CategoriesComponent } from './sections/categories/categories.component';
import { AdvantagesComponent } from './sections/advantages/advantages.component';
import { ExampleComponent } from './sections/example/example.component';

@Component({
  selector: 'app-home',
  imports: [
    PromoComponent,
    CategoriesComponent,
    AdvantagesComponent,
    ExampleComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
