// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { CommonModule } from '@angular/common'; // Cần cho async pipe nếu dùng

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        CommonModule
    ],
    template: `
    <app-header [isTransparent]="isHeaderTransparent"></app-header>
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
    styleUrls: ['../styles.scss']
})
export class AppComponent implements OnInit {
    // Biến này sẽ quyết định header có trong suốt hay không
    isHeaderTransparent: boolean = true;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        // Lắng nghe các sự kiện của router
        this.router.events.pipe(
            // 1. Chỉ lọc các sự kiện NavigationEnd (khi route đã thay đổi xong)
            filter(event => event instanceof NavigationEnd),
            // 2. Lấy dữ liệu (data) từ route được kích hoạt
            map(() => {
                let route = this.activatedRoute;
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            map(route => route.snapshot.data)
        ).subscribe(data => {
            // 3. Cập nhật biến isHeaderTransparent dựa trên dữ liệu của route
            // Mặc định là false (không trong suốt) nếu không được định nghĩa trong route
            this.isHeaderTransparent = data['headerTransparent'] === true;
        });
    }
}