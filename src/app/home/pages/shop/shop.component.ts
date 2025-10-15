import { Component, signal } from '@angular/core';
import { NgFor } from '@angular/common'; // <-- 1. Import NgFor
import { Product } from '../../../models/product.model';
import { ProductCardComponent } from '../../../components/product-card/product-card';

// `register()` cho Swiper không cần thiết ở đây nếu bạn không dùng slider trong component này
// register(); 

@Component({
  selector: 'app-shop',
  standalone: true, // <-- 2. Khai báo component là standalone
  imports: [
    NgFor, // <-- 3. Thêm NgFor vào imports
    ProductCardComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  protected readonly title = signal('shop');

  // Dữ liệu sản phẩm của bạn
  products: Product[] = [
    {
      slug: 'training-club-t-shirt-white',
      name: 'Training Club T-Shirt White',
      price: 490000,
      mainImage: 'assets/images/product-image.png',
      previewImage: 'assets/images/preview-image.png',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      slug: 'running-shorts-black',
      name: 'Running Shorts Black',
      price: 350000,
      mainImage: 'assets/images/product-image.png',
      previewImage: 'assets/images/preview-image.png',
      sizes: ['M', 'L']
    },
    {
      slug: 'essential-hoodie-gray',
      name: 'Essential Hoodie Gray',
      price: 720000,
      mainImage: 'assets/images/product-image.png',
      previewImage: 'assets/images/preview-image.png',
      sizes: ['S', 'M', 'L']
    },
    // ...
  ];
}