import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-program-page',
  imports: [TranslocoPipe],
  templateUrl: './program.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramPage {}
