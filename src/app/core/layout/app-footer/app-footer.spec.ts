import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { beforeEach, describe, expect, it } from 'vitest';

import { AppFooter } from './app-footer';

describe('AppFooter', () => {
  let fixture: ComponentFixture<AppFooter>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppFooter,
        TranslocoTestingModule.forRoot({
          langs: {
            en: {
              navigation: {
                goHome: 'Go to homepage',
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
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFooter);
    element = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the footer landmark', () => {
    const footer = element.querySelector('footer');

    expect(footer).not.toBeNull();
    expect(footer?.classList.contains('app-footer')).toBe(true);
  });

  it('renders a home link with an accessible name', () => {
    const logoLink = element.querySelector<HTMLAnchorElement>('.app-footer__logo-link');

    expect(logoLink?.getAttribute('href')).toBe('/');
    expect(logoLink?.getAttribute('aria-label')).toBe('Go to homepage');
  });

  it('uses the footer logo from the SVG sprite', () => {
    const logo = element.querySelector<SVGSVGElement>('.app-footer__logo');

    expect(logo?.getAttribute('width')).toBe('128');
    expect(logo?.getAttribute('height')).toBe('24');

    expect(logo?.querySelector('use')?.getAttribute('href')).toBe('/images/sprite.svg#footer-logo');
  });

  it('renders the three original social links', () => {
    const links = element.querySelectorAll<HTMLAnchorElement>('.app-footer__social-link');

    expect(links.length).toBe(2);

    expect([...links].map((link) => link.getAttribute('aria-label'))).toEqual([
      'Instagram',
      'Facebook',
    ]);

    expect([...links].map((link) => link.querySelector('use')?.getAttribute('href'))).toEqual([
      '/images/sprite.svg#icon-insta',
      '/images/sprite.svg#icon-fb',
    ]);
  });

  it('prevents placeholder social links from navigating', () => {
    const links = element.querySelectorAll<HTMLAnchorElement>('.app-footer__social-link');

    for (const link of links) {
      expect(link.getAttribute('href')).toBe('#');
      expect(link.getAttribute('aria-disabled')).toBe('true');

      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });

      link.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    }
  });

  it('links to the original HTML Academy course', () => {
    const academyLink = element.querySelector<HTMLAnchorElement>('.app-footer__academy-link');

    expect(academyLink?.href).toBe('https://htmlacademy.ru/intensive/adaptive');

    expect(academyLink?.textContent?.trim()).toBe('HTML Academy');

    expect(academyLink?.querySelector('use')?.getAttribute('href')).toBe(
      '/images/sprite.svg#htmlacademy',
    );
  });
});
