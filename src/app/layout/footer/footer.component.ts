import { Component } from '@angular/core';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { SOCIAL_LINKS } from '../../core/data/socail-links.data';
import { ScrollTopButtonComponent } from '../../shared/components/scroll-top-button/scroll-top-button.component';

@Component({
  selector: 'app-footer',
  imports: [SocialLinksComponent, ScrollTopButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly socialLinks = SOCIAL_LINKS;
}
