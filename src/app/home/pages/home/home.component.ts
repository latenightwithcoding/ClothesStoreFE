import { Component, ViewChild, ElementRef, AfterViewInit, signal, HostListener } from '@angular/core';

// Import Swiper
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { Product } from '../../../models/product.model';
import { NgFor } from '@angular/common';
import { ProductCardComponent } from '../../../components/product-card/product-card';

register(); // Đăng ký các element của Swiper

@Component({
  selector: 'app-home',
  imports: [
    NgFor, // <-- 3. Thêm NgFor vào imports
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  protected readonly title = signal('shop');

  // Lấy tham chiếu đến các phần tử trong HTML
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('shopByCollectionSlider') sliderContainer!: ElementRef;
  private swiperInstance: Swiper | undefined;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.setupSlider();
  }

  // Chỉ một phương thức ngAfterViewInit duy nhất
  ngAfterViewInit(): void {
    this.initializeVideoPlayer();
    this.setupSlider();
  }

  // Tách logic ra các hàm riêng để code sạch sẽ hơn (khuyến khích)
  private initializeVideoPlayer(): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.muted = true;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((error: DOMException) => {
          console.error("Lỗi tự động phát video:", error);
        });
      }
    }
  }

  private setupSlider(): void {
    const isMobile = window.innerWidth <= 768;

    if (isMobile && !this.swiperInstance) {
      const swiperContainer = this.sliderContainer.nativeElement;
      // Đếm số lượng slide thực tế trong HTML
      const numberOfSlides = swiperContainer.querySelectorAll('.swiper-slide').length;

      // Chỉ bật loop nếu có nhiều hơn 3 slide
      const enableLoop = numberOfSlides > 3;
      // Nếu là mobile VÀ slider chưa được tạo -> Tạo mới
      this.swiperInstance = new Swiper(this.sliderContainer.nativeElement, {
        slidesPerView: 'auto',   // Rất quan trọng khi slide có width tùy chỉnh
        spaceBetween: 16,
        centeredSlides: true,    // Giúp slide active nằm giữa đẹp hơn
        loop: enableLoop,              // Slider vô tận
      });
    } else if (!isMobile && this.swiperInstance) {
      // Nếu là desktop VÀ slider đang tồn tại -> Hủy nó đi
      this.swiperInstance.destroy();
      this.swiperInstance = undefined;
    }
  }

  ngOnDestroy(): void {
    if (this.swiperInstance) {
      this.swiperInstance.destroy();
    }
  }

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
    // ...
  ];
}