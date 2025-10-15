import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import { ShopComponent } from './home/pages/shop/shop.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { headerTransparent: true } },
    { path: 'shop', component: ShopComponent, data: { headerTransparent: false } },
    { path: 'product/:slug', component: ShopComponent, data: { headerTransparent: false } } // Placeholder for ProductDetailComponent
];
