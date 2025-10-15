import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ScrollingBarComponent } from '../scrollingbar/scrollingbar.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tdesignUser1Filled, tdesignCartFilled } from '@ng-icons/tdesign-icons';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header', // Tên thẻ HTML để sử dụng component: <app-header></app-header>
    standalone: true,      // Đánh dấu đây là Standalone Component, không cần module
    imports: [
        RouterLink,        // Cần import để dùng routerLink trong template
        RouterLinkActive,
        MatIconModule,      // Cần import để dùng MatIcon trong template
        ScrollingBarComponent,
        NgIcon,
        NgClass
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    viewProviders: [MatIconRegistry, provideIcons({ tdesignUser1Filled, tdesignCartFilled })]
})
export class HeaderComponent {
    title = 'Shop';
    @Input() isTransparent: boolean = true;
    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'logo',
            sanitizer.bypassSecurityTrustResourceUrl('assets/branding/logo.svg')
        );
        iconRegistry.addSvgIcon(
            'brand_name',
            sanitizer.bypassSecurityTrustResourceUrl('assets/branding/brand-name.svg')
        );
        iconRegistry.addSvgIcon(
            'menu',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg')
        );
        iconRegistry.addSvgIcon(
            'person',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/person.svg')
        );
    }
}