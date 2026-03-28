import { Component } from '@angular/core';
import { PromoComponent } from './sections/promo/promo.component';

@Component({
  selector: 'app-home',
  imports: [PromoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
