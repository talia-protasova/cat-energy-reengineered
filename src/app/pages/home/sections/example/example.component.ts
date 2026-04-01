import { Component } from '@angular/core';
import { ExampleStatsComponent } from './example-stats/example-stats.component';
import { BeforeAfterSliderComponent } from './before-after-slider/before-after-slider.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ExampleStatsComponent, BeforeAfterSliderComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent {}
