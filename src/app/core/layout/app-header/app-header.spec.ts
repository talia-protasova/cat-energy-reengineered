import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { beforeEach, describe, expect, it } from 'vitest';

import { AppHeader } from './app-header';

@Component({
  template: '',
})
class TestPage {}

@Component({
  imports: [AppHeader, RouterOutlet],
  template: `
    <app-header />

    <main id="main-content" tabindex="-1">
      <router-outlet />
    </main>
  `,
})
class TestHost {}

describe('AppHeader', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: HTMLElement;
  let router: Router;

  const getMenuButton = (): HTMLButtonElement => {
    const button = host.querySelector<HTMLButtonElement>('.app-header__menu-button');

    if (!button) {
      throw new Error('Mobile menu button not found');
    }

    return button;
  };

  const getNavigation = (): HTMLElement => {
    const navigation = host.querySelector<HTMLElement>('#primary-navigation');

    if (!navigation) {
      throw new Error('Primary navigation not found');
    }

    return navigation;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHost,
        TranslocoTestingModule.forRoot({
          langs: {
            en: {
              navigation: {
                home: 'Home',
                catalog: 'Catalog',
                program: 'Program',
                goHome: 'Go to homepage',
                openMenu: 'Open menu',
                closeMenu: 'Close menu',
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
          {
            path: 'catalog',
            component: TestPage,
          },
          {
            path: 'program',
            component: TestPage,
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    host = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the three navigation links', () => {
    const links = host.querySelectorAll<HTMLAnchorElement>('.app-header__nav-link');

    expect(links.length).toBe(3);

    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/catalog');
    expect(links[2].getAttribute('href')).toBe('/program');

    expect(links[0].textContent?.trim()).toBe('Home');
    expect(links[1].textContent?.trim()).toBe('Catalog');
    expect(links[2].textContent?.trim()).toBe('Program');
  });

  it('starts with the mobile menu closed', () => {
    const button = getMenuButton();
    const navigation = getNavigation();

    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('aria-label')).toBe('Open menu');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-controls')).toBe('primary-navigation');

    expect(navigation.classList.contains('app-header__nav--open')).toBe(false);
  });

  it('opens and closes the menu when the button is clicked', () => {
    const button = getMenuButton();
    const navigation = getNavigation();

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(button.getAttribute('aria-label')).toBe('Close menu');

    expect(navigation.classList.contains('app-header__nav--open')).toBe(true);

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-label')).toBe('Open menu');

    expect(navigation.classList.contains('app-header__nav--open')).toBe(false);
  });

  it('closes the menu with Escape and returns focus to the button', () => {
    const button = getMenuButton();

    button.click();
    fixture.detectChanges();

    const link = host.querySelector<HTMLAnchorElement>('.app-header__nav-link');

    expect(link).not.toBeNull();

    link?.focus();

    expect(document.activeElement).toBe(link);

    link?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    );

    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
  });

  it('does not intercept Escape when the menu is closed', () => {
    const button = getMenuButton();

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });

    button.dispatchEvent(event);
    fixture.detectChanges();

    expect(event.defaultPrevented).toBe(false);
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the menu on route change and focuses main content', async () => {
    const button = getMenuButton();

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('true');

    await router.navigateByUrl('/catalog');
    fixture.detectChanges();

    const main = host.querySelector<HTMLElement>('#main-content');

    expect(router.url).toBe('/catalog');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(main);
  });

  it('updates aria-current when the active route changes', async () => {
    const homeLink = host.querySelector<HTMLAnchorElement>('.app-header__nav-link[href="/"]');

    const catalogLink = host.querySelector<HTMLAnchorElement>(
      '.app-header__nav-link[href="/catalog"]',
    );

    await router.navigateByUrl('/');
    fixture.detectChanges();

    expect(homeLink?.getAttribute('aria-current')).toBe('page');
    expect(catalogLink?.hasAttribute('aria-current')).toBe(false);

    await router.navigateByUrl('/catalog');
    fixture.detectChanges();

    expect(homeLink?.hasAttribute('aria-current')).toBe(false);
    expect(catalogLink?.getAttribute('aria-current')).toBe('page');
  });
});
