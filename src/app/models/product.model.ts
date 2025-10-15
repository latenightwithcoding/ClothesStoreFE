// src/app/models/product.model.ts
export interface Product {
    slug: string;          // Dùng cho routerLink, ví dụ: 'training-club-t-shirt-white'
    name: string;
    price: number;
    mainImage: string;     // Đường dẫn ảnh chính
    previewImage: string;  // Đường dẫn ảnh khi hover
    sizes: string[];       // Mảng các size có sẵn, ví dụ: ['S', 'M', 'L']
}