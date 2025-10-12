import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    // Tự động lấy năm hiện tại để hiển thị
    currentYear: number = new Date().getFullYear();
}