import { Injectable, inject } from '@angular/core';
import { fromEvent, map, startWith, throttleTime } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly scroll$ = fromEvent(window, 'scroll').pipe(
    throttleTime(100),
    map(() => window.scrollY),
    startWith(window.scrollY),
  );

  isScrolledBeyond(offset = 600) {
    return this.scroll$.pipe(map((scrollY) => scrollY > offset));
  }
}
