import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-item-accordion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-item-accordion.component.html',
  styleUrls: ['./menu-item-accordion.component.scss'],
})
export class MenuItemAccordionComponent {
  @Input() title!: string;
  @Input() link?: string;
  @Input() drawerOpen: boolean = true;
  @Input() subItems: { label: string; link?: string }[] = [];

  isOpen = false;

  get hasSubItems() {
    return this.subItems && this.subItems.length > 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['drawerOpen'] && !this.drawerOpen) {
      // 👇 Drawer đóng → đóng submenu
      this.isOpen = false;
    }
  }

  toggleAccordion(event: Event) {
    if (this.hasSubItems) {
      event.preventDefault(); // tránh click vào link nếu là accordion
      this.isOpen = !this.isOpen;
    }
  }
}
