import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  @Input() isOpen: boolean = false;
  @Input() position: 'left' | 'right' | 'top' | 'bottom' | 'full' = 'left';
  @Input() size: 'sm' | 'm' | 'lg' | 'xl' = 'm';
  @Input() header?: string;
  @Input() closable: boolean = true;

  @Output() isOpenChange = new EventEmitter<boolean>();

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  getDrawerClasses(): Record<string, boolean> {
    return {
      'drawer-container': true,
      [`position-${this.position}`]: true,
      [`size-${this.size}`]: true,
      'is-open': this.isOpen,
    };
  }
}
