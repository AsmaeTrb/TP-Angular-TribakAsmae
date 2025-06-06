import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductdetailsComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('promoVideo', { static: false }) promoVideo!: ElementRef<HTMLVideoElement>;
  
  products: Product[] = [];
  selectedProduct!: Product;
  filter: string = '';

  constructor(
    private getDataService: GetDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDataService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
    
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }

  ngAfterViewInit(): void {
    this.setupVideoObserver();
  }

  private setupVideoObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.playVideo().catch(e => {
              console.warn('Auto-play prevented:', e);
            });
          } else {
            this.pauseVideo();
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    if (this.promoVideo?.nativeElement) {
      observer.observe(this.promoVideo.nativeElement);
    }
  }

  playVideo(): Promise<void> {
    if (this.promoVideo?.nativeElement) {
      return this.promoVideo.nativeElement.play();
    }
    return Promise.reject('Video element not found');
  }

  pauseVideo(): void {
    if (this.promoVideo?.nativeElement) {
      this.promoVideo.nativeElement.pause();
    }
  }

  voirDetails(product: Product): void {
    this.selectedProduct = product;
  }

  getFilteredProducts(): Product[] {
    return this.filter === ''
      ? this.products
      : this.products.filter((product: Product) => product.category === this.filter);
  }

  hasLowStock(product: Product): boolean {
    return product.sizes.some(size => size.quantity < 10);
  }
}