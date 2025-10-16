import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ScrollingBarComponent } from '../scrollingbar/scrollingbar.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tdesignUser1Filled, tdesignCartFilled } from '@ng-icons/tdesign-icons';
import { NgClass } from '@angular/common';
import { DrawerComponent } from '../../../components/drawer/drawer.component';
import { MenuItemAccordionComponent } from '../../../components/menu-item-accordion/menu-item-accordion.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        MatIconModule,
        ScrollingBarComponent,
        NgIcon,
        NgClass,
        DrawerComponent,
        MenuItemAccordionComponent
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    viewProviders: [MatIconRegistry, provideIcons({ tdesignUser1Filled, tdesignCartFilled })]
})
export class HeaderComponent implements OnInit, OnDestroy {
    title = 'Shop';
    @Input() isTransparent: boolean = true;

    private routerSub?: Subscription;

    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private router: Router
    ) {
        iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('assets/branding/logo.svg'));
        iconRegistry.addSvgIcon('brand_name', sanitizer.bypassSecurityTrustResourceUrl('assets/branding/brand-name.svg'));
        iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu.svg'));
        iconRegistry.addSvgIcon('person', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/person.svg'));
    }

    isDrawerOpen = false;
    drawerPosition: 'left' | 'right' | 'top' | 'bottom' | 'full' = 'left';
    drawerSize: 'sm' | 'm' | 'lg' | 'xl' = 'm';

    ngOnInit() {
        // 👇 Lắng nghe sự kiện chuyển route
        this.routerSub = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                if (this.isDrawerOpen) this.close();
            });
    }

    ngOnDestroy() {
        this.routerSub?.unsubscribe();
    }

    openDrawer(position: 'left' | 'right' | 'top' | 'bottom' | 'full', size: 'sm' | 'm' | 'lg' | 'xl') {
        this.drawerPosition = position;
        this.drawerSize = size;
        this.isDrawerOpen = true;
    }

    close() {
        this.isDrawerOpen = false;
    }
}
