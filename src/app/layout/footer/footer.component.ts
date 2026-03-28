import { Component } from '@angular/core';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { SOCIAL_LINKS } from '../../core/data/socail-links.data';

@Component({
  selector: 'app-footer',
  imports: [SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly socialLinks = SOCIAL_LINKS;
}
