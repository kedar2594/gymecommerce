import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'embryo-TopProducts',
  templateUrl: './TopProducts.component.html',
  styleUrls: ['./TopProducts.component.scss']
})
export class TopProductsComponent implements OnInit {


  @Input() products: any;

  @Input() currency: any;

  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  gridLength = 5;
  randomSortProducts: any;


  constructor() {

  }

  ngOnInit() {


    if (this.products) {
      this.randomSortProducts = this.products.sort(() => Math.random() - 0.5);
    }

    console.log('TopProducts', this.randomSortProducts);
  }

  public addToCartProduct(value: any) {
    //  value.status = 1;
    this.addToCart.emit(value);
  }

  public extendGridStructure(status) {
    if (status) {
      if (this.gridLength != 15) {
        this.gridLength += 5;
      }
    } else {
      if (this.gridLength != 5) {
        this.gridLength -= 5;
      }
    }
  }



}
