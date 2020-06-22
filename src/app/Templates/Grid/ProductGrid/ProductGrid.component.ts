import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'embryo-ProductGrid',
  templateUrl: './ProductGrid.component.html',
  styleUrls: ['./ProductGrid.component.scss']
})
export class ProductGridComponent implements OnInit {

  p: number = 1;
  number: any;

  @Input() products: any;

  @Input() currency: string;

  @Input() gridLength: any;

  @Input() gridThree: boolean = false;

  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  @Output() addToWishList: EventEmitter<any> = new EventEmitter();

  loaded = false;
  lg = 25;
  xl = 25;

  trackByObjectID(index, hit) {
    return hit.objectID;
  }

  constructor() {
    this.number = 12;
  }

  ngOnInit() {
    console.log('akshhhhh', this.gridLength);

    console.log('akshhhhh', this.products);

    if (this.gridThree) {
      this.lg = 25;
      this.xl = 25;
    }
  }

  public addToCartProduct(value: any) {
    this.addToCart.emit(value);
  }

  public onLoad() {
    this.loaded = true;
  }

  public productAddToWishlist(value: any, parentClass) {
    if (!($('.' + parentClass).hasClass('wishlist-active'))) {
      $('.' + parentClass).addClass('wishlist-active');
    }
    this.addToWishList.emit(value);
  }

  public checkCartAlready(singleProduct) {
    // console.log(singleProduct);
    let products = JSON.parse(localStorage.getItem("cart_item")) || [];
    if (!products.some((item) => item.productId == singleProduct.productId)) {
      return true;
    }
  }

  pageChanged(event) {
    // console.log(event)
    this.p = event;
  }

}
