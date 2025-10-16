import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import { ShopComponent } from './home/pages/shop/shop.component';
import { NotFoundComponent } from './not-found/not-found';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { headerTransparent: true } },
    { path: 'shop', component: ShopComponent, data: { headerTransparent: false } },
    { path: 'product/:slug', component: ShopComponent, data: { headerTransparent: false } } // Placeholder for ProductDetailComponent
    ,
    { path: '**', component: NotFoundComponent, data: { headerTransparent: true } } // Wildcard route for a 404 page
];
