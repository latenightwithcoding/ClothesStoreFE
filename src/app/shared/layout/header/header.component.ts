import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header', // Tên thẻ HTML để sử dụng component: <app-header></app-header>
    standalone: true,      // Đánh dấu đây là Standalone Component, không cần module
    imports: [
        RouterLink,        // Cần import để dùng routerLink trong template
        RouterLinkActive   // Cần import để dùng routerLinkActive
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    title = 'Shop';
}