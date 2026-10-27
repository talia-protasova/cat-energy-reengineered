import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { beforeEach, describe, expect, it } from 'vitest';

import { SkipLink } from '../../../shared/ui/skip-link/skip-link';
import { AppShell } from './app-shell';

@Component({
  selector: 'app-header',
  template: '<header>Header</header>',
})
class MockAppHeader {}

@Component({
  selector: 'app-footer',
  template: '<footer>Footer</footer>',
})
class MockAppFooter {}

@Component({
  selector: 'app-theme-switcher',
  template: '',
})
class MockThemeSwitcher {}

@Component({
  selector: 'app-language-switcher',
  template: '',
})
class MockLanguageSwitcher {}

@Component({
  template: '<h1>Test page</h1>',
})
class TestPage {}

describe('AppShell', () => {
  let fixture: ComponentFixture<AppShell>;
  let element: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppShell,
        TranslocoTestingModule.forRoot({
          langs: {
            en: {
              common: {
                skipToMain: 'Skip to main content',
              },
            },
          },
          translocoConfig: {
            availableLangs: ['en'],
            defaultLang: 'en',
            reRenderOnLangChange: true,
          },
          preloadLangs: true,
        }),
      ],
      providers: [
        provideRouter([
          {
            path: '',
            component: TestPage,
          },
        ]),
      ],
    })
      .overrideComponent(AppShell, {
        set: {
          imports: [
            RouterOutlet,
            SkipLink,
            MockAppHeader,
            MockAppFooter,
            MockThemeSwitcher,
            MockLanguageSwitcher,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppShell);
    element = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders a single main landmark', () => {
    const mainElements = element.querySelectorAll('main');

    expect(mainElements.length).toBe(1);
    expect(mainElements[0].id).toBe('main-content');
  });

  it('renders the layout elements in the correct order', () => {
    const children = [...element.children].map((child) =>
      child.tagName.toLowerCase(),
    );

    expect(children).toEqual([
      'app-skip-link',
      'div',
      'app-header',
      'main',
      'app-footer',
    ]);
  });

  it('keeps preferences outside the header', () => {
    const preferences = element.querySelector(
      '.app-shell__preferences',
    );

    const themeSwitcher = preferences?.querySelector(
      'app-theme-switcher',
    );

    const languageSwitcher = preferences?.querySelector(
      'app-language-switcher',
    );

    expect(preferences).not.toBeNull();
    expect(themeSwitcher).not.toBeNull();
    expect(languageSwitcher).not.toBeNull();

    expect(
      element.querySelector('app-header app-theme-switcher'),
    ).toBeNull();

    expect(
      element.querySelector('app-header app-language-switcher'),
    ).toBeNull();
  });

  it('connects the skip link to the focusable main landmark', () => {
    const skipLink = element.querySelector<HTMLAnchorElement>(
      'app-skip-link a',
    );

    const main = element.querySelector<HTMLElement>(
      '#main-content',
    );

    expect(skipLink?.getAttribute('href')).toBe('#main-content');
    expect(skipLink?.textContent?.trim()).toBe(
      'Skip to main content',
    );

    expect(main?.getAttribute('tabindex')).toBe('-1');
  });

  it('renders the active page inside main', async () => {
    await router.navigateByUrl('/');

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const main = element.querySelector('main');
    const heading = main?.querySelector('h1');

    expect(main?.querySelector('router-outlet')).not.toBeNull();
    expect(heading?.textContent).toBe('Test page');
  });
});