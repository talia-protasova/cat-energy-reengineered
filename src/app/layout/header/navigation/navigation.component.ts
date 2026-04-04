import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationItem } from '../../../core/models/navigation-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  @Input() navigation: readonly NavigationItem[] = [];
  @Input() isOpen = false;
  @Output() linkClick = new EventEmitter<void>();

  isDesktop = window.innerWidth >= 1024;

  onLinkClick() {
    this.linkClick.emit();
  }

  trackByPath(index: number, item: NavigationItem) {
    return item.path;
  }
}
