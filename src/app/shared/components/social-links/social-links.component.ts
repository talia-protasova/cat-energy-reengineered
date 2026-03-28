import { Component, Input } from '@angular/core';
import { SocialLink, SocialType } from '../../../core/models';
import { CommonModule } from '@angular/common';

const SOCIAL_META: Record<SocialType, { label: string; icon: string }> = {
  telegram: {
    label: 'Cat Energy on Telegram',
    icon: '#telegram',
  },
  instagram: {
    label: 'Cat Energy on Instagram',
    icon: '#icon-insta',
  },
  facebook: {
    label: 'Cat Energy on Facebook',
    icon: '#icon-fb',
  },
};

@Component({
  selector: 'app-social-links',
  imports: [CommonModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  @Input() links: SocialLink[] = [];

  readonly meta = SOCIAL_META;

  getMeta(type: SocialType) {
    return this.meta[type];
  }

  trackByType(_: number, item: SocialLink) {
    return item.type;
  }
}
