// src/app/components/product-card/product-card.component.ts

import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router'; // <--- 1. Import RouterLink

@Component({
  selector: 'app-product-card',
  standalone: true, // <-- Vì đây là standalone component
  imports: [
    NgFor,          // Dùng cho *ngFor
    CurrencyPipe,   // Dùng cho pipe currency
    RouterLink      // <--- 2. Thêm vào mảng imports
  ],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
}