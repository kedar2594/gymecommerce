import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
@Component({
  selector: 'embryo-ProductCard',
  templateUrl: './ProductCard.component.html',
  styleUrls: ['./ProductCard.component.scss']
})
export class ProductCardComponent implements OnInit {
  productsSliderData: any;

  @Input() product: any;

  @Input() index: any;

  @Input() currency: string;

  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  @Output() addToWishlist: EventEmitter<any> = new EventEmitter();

  slides = [
    {
      img: "assets/images/home-banner01.jpg",
      content: "<h4>New Arrival</h4><h1 class='text-main'>Biggest Sale</h1><h1 class='text-bold mb-4'>50% <sup class='bold-sup'>Flat Off</sup></h1>"
    },
    {
      img: "assets/images/home-banner02.jpg",
      content: "<h4>Women's Special</h4><h1 class='text-main'>Winter Sale </h1><h1 class='text-bold mb-4'>40% <sup class='bold-sup'>Off</sup></h1>"
    },
    {
      img: "assets/images/home-banner03.jpg",
      content: "<h4>Special Deal</h4><h1 class='text-main'>Mens Collection</h1><h1 class='text-bold mb-4'>30% <sup class='bold-sup'>Off</sup></h1>"
    },
    {
      img: "assets/images/home-banner04.jpg",
      content: "<h4>Sunglasses</h4><h1 class='text-main'>Weekly Offer</h1><h1 class='text-bold mb-4'>30% <sup class='bold-sup'>Off</sup></h1>"
    },
    {
      img: "assets/images/home-banner06.jpg",
      content: "<h4>New Arrival</h4><h1 class='text-main'>Sports Shoes</h1><h1 class='text-bold mb-4'>50% <sup class='bold-sup'>Flat Off</sup></h1>"
    },
    {
      img: "assets/images/gym-accessories.jpg",
      content: "<h4 class='text-color'>Accessories</h4><h1 class='text-main text-color'>Smart Offer</h1><h1 class='text-bold mb-4 text-color'>40% <sup class='bold-sup text-color'>Flat Off</sup></h1>"
    }
  ];
  constructor(private homeService: HomeTwoService) {

    this.getFeaturedProducts()
  }

  ngOnInit() {
    console.log('akshh', this.product);
  }

  public addToCartProduct(value: any) {
    console.log('addToCartProduct', value);
    this.addToCart.emit(value);
  }

  public productAddToWishlist(value: any, parentClass) {
    if (!($('.' + parentClass).hasClass('wishlist-active'))) {
      $('.' + parentClass).addClass('wishlist-active');
    }

    this.addToWishlist.emit(value);
  }

  public checkCartAlready(singleProduct) {

    let products = JSON.parse(localStorage.getItem("cart_item")) || [];

    if (!products.some((item) => item.productId == singleProduct.productId)) {
      return true;
    }
  }

  getFeaturedProducts() {
    this.homeService.viewproducts().subscribe((data: any) => {
      if (data.isStatus == true) {

        this.productsSliderData = data.response;
      }
    })
  }


}
