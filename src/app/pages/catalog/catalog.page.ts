import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-catalog-page',
  imports: [TranslocoPipe],
  templateUrl: './catalog.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPage {}
