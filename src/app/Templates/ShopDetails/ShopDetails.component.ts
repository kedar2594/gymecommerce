import { HomeTwoService } from './../../Pages/Home/home-two.service';
import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit, Inject, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $: any;

import { EmbryoService } from '../../Services/Embryo.service';
import { DOCUMENT } from "@angular/platform-browser";



@Component({
  selector: 'embryo-ShopDetails',
  templateUrl: './ShopDetails.component.html',
  styleUrls: ['./ShopDetails.component.scss']
})
export class ShopDetailsComponent implements OnInit, OnChanges {
  window1: any;
  href: any;
  pinchZoom: any;

  windowScrolled: boolean;

  /////may14/////
  color = 'Yellow';
  mode = 'determinate';
  value = 50;
  bufferValue = 25;


  ///may-14/////
  topProducts: any;
  lighteningDealsProducts: any;
  blogList: any;
  productsArray: any;
  productsSliderData: any = [];
  productsSubcategories: any = [];
  newProductsSliderData: any;
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  rtlSlideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  myProperties: any = [];


  @Input() detailData: any;

  // @Input() detailData : any;
  @Input() currency: string;

  mainImgPath: string;
  totalPrice: any;
  type: any;
  colorsArray: string[] = ["Red", "Blue", "Yellow", "Green"];
  sizeArray: number[] = [36, 38, 40, 42, 44, 46, 48];
  quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  productReviews: any;
  images: any;
  specification: any;
  mobWidth: any;
  mobScreenSize: number = 767;
  constructor(

    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,
    public embryoService: EmbryoService, private homeService: HomeTwoService
  ) {
    this.embryoService.getProductReviews().valueChanges().subscribe(res => { this.productReviews = res });
    this.getFeaturedProducts();
    this.myProperties = [{
      'wheel': true,
      'auto-zoom-out': true,
      'double-tap': true,
      'limit-zoom': 10
    }

    ],
      this.mobWidth = window.screen.width;

    this.window1 = window.location.href;
  }

  @HostListener("window:scroll", [])

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {

      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }

    })();
  }

  ngOnInit() {

    console.log(this.detailData);
    this.mainImgPath = this.detailData[0].productImgIds[0].fileName;
    this.totalPrice = this.detailData.price;
    this.images = this.detailData[0].productImgIds;
    this.specification = this.detailData[0].specificationIds;
    console.log(this.images);
    this.route.params.subscribe(res => {
      this.type = null;
      this.type = res.type;
      let param2 = res.id;
      this.ViewAllProductsBasedOnSubCategoryId(param2);
    });
    this.href = this.router.url;
    console.log(this.router.url);
    console.log(window.location.href);

  }



  destroy() {
    this.pinchZoom.destroy();
  }

  ngOnChanges() {
    console.log(this.detailData[0].productId);
    // this.mainImgPath = null;
    // this.totalPrice  = null;
    // this.mainImgPath = this.detailData.image;
    // this.totalPrice  = this.detailData.price;
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    this.getFeaturedProducts1(this.detailData[0].productId);
    window.scrollTo(0, 0)

  }
  window() {
    window.scrollTo(0, 0)
  }
  getFeaturedProducts1(productid) {
    this.homeService.viewProdSpecification(productid).subscribe((data: any) => {
      if (data.isStatus == true) {
        console.log(data.response);
        this.detailData = data.response;
        this.mainImgPath = this.detailData[0].productImgIds[0].fileName;
        this.totalPrice = this.detailData.price;
        this.images = this.detailData[0].productImgIds;
        this.specification = this.detailData[0].specificationIds;
      }
    })
  }
  getFeaturedProducts() {
    this.homeService.viewproducts().subscribe((data: any) => {
      if (data.isStatus == true) {

        this.productsSliderData = data.response;
      }
      console.log("akshatha123", this.productsSliderData);
    })
  }
  ViewAllProductsBasedOnSubCategoryId(subcategoryid) {
    this.homeService.viewproductsbasedonsubcategoryid(subcategoryid).subscribe((data: any) => {
      if (data.isStatus == true) {

        this.productsSubcategories = data.response;

      }
      console.log("bas", this.productsSubcategories);
    })
  }
  /**
   * getImagePath is used to change the image path on click event.
   */
  public getImagePath(imgPath: string, index: number) {
    console.log(imgPath);
    console.log(index);

    $('.p-link').removeClass('border-active');
    this.mainImgPath = imgPath;
    $("#" + index + "_img").addClass('border-active');
    this.destroy();
  }


  public calculatePrice(detailData: any, value: any) {
    detailData.quantity = value;
    this.totalPrice = detailData.price * value;
  }

  public reviewPopup(detailData) {
    let reviews: any = null;
    for (let review of this.productReviews) {
      // if((review.id == detailData.id) && (review.type == detailData.type) && (review.category == detailData.category)){
      //    singleProduct = review;
      //    break;
      // }

      reviews = review.user_rating;
    }

    this.embryoService.reviewPopup(detailData, reviews);
  }

  public addToWishlist(value: any) {
    console.log('wishlist', value);
    this.embryoService.addToWishlist(value);
  }

  public addToCart(value: any) {
    console.log('shopD', value);
    this.embryoService.addToCart(value);
  }

  public buyNow(value: any) {
    this.embryoService.addToCart(value);
    console.log('shopD', value);

    this.router.navigate(['/cart']);
  }

  facebook() {
    console.log("facebook");
    console.log(window.location.href);
    this.router.navigate(['']);

  }

}
