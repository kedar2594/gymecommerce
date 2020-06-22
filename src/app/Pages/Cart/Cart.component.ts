import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, AfterViewChecked, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit, Inject, HostListener } from '@angular/core';

import { EmbryoService } from '../../Services/Embryo.service';
import {
  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { DOCUMENT } from "@angular/platform-browser";


@Component({
  selector: 'embryo-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewChecked {
  windowScrolled: boolean;

  products: any;
  quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  popupResponse: any;
  durationInSeconds = 2;
  //  message: string = 'Fields marked with * is mandatory';
  actionButtonLabel: string = 'SignIn';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  action: boolean = true;
  autoHide: number = 2000;
  setAutoHide: boolean = true;
  loaclfinalProducts: any = [];
  finalApiProducts: any = [];
  loaclfinalWishlistProducts: any = [];
  finalApiWishListProducts: any = [];


  constructor(
    @Inject(DOCUMENT) private document: Document,

    public embryoService: EmbryoService,
    public homeService: HomeTwoService,
    private router: Router,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private loadingBar: LoadingBarService,
    private cdRef: ChangeDetectorRef) {
    let getCartItems = this.embryoService.localStorageCartProducts;
    console.log(getCartItems);
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
  window() {
    window.scrollTo(0, 0)
  }
  ngOnInit() {
    window.scrollTo(0, 0);

  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
    let loaclfinalProducts = this.embryoService.localStorageCartProducts;
    console.log(loaclfinalProducts);
  }

  public removeProduct(value: any) {
    let message = "Are you sure you want to delete this product?";
    this.embryoService.confirmationPopup(message).
      subscribe(res => { this.popupResponse = res },
        err => console.log(err),
        () => this.getPopupResponse(this.popupResponse, value)
      );
  }

  public getPopupResponse(response, value) {
    if (response) {
      this.embryoService.removeLocalCartProduct(value);
    }
  }

  // public calculateProductSinglePrice(product: any, value: any) {
  //   let price = 0;
  //   product.quantity = value;
  //   price = product.sellingPrice * value;
  //   return price;
  // }

  public calculateProductSinglePrice(product: any, value: any) {

    let price = 0;
    if (product.discountPercentage > 0 && product.specialDiscountPercentage > 0) {
      product.quantity = value;
      price = ((product.sellingPrice) - (product.sellingPrice * ((product.discountPercentage / 100) + (product.specialDiscountPercentage / 100)))) * value;
      return price;
    } else {
      if (product.discountPercentage > 0) {
        product.quantity = value;
        price = ((product.sellingPrice) - (product.sellingPrice * (product.discountPercentage / 100))) * value;
        return price;
      } else {
        if (product.specialDiscountPercentage > 0) {
          product.quantity = value;
          price = ((product.sellingPrice) - (product.sellingPrice * (product.specialDiscountPercentage / 100))) * value;
          return price;
        } else {
          product.quantity = value;
          price = product.sellingPrice * value;
          return price;
        }
      }
    }


  }

  public calculateTotalPrice() {
    let subtotal = 0;
    if (this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length > 0) {
      for (let product of this.embryoService.localStorageCartProducts) {
        let price = 0;
        //  if(){

        //  }else{
        //   if (product.discountPercentage > 0) {

        //     subtotal += ((product.sellingPrice) - (product.sellingPrice * (product.discountPercentage / 100))) * product.quantity;
        //     // return subtotal;
        //   } else {

        //     subtotal += (product.sellingPrice * product.quantity);
        //     // return subtotal;
        //   }
        //  }
        if (product.discountPercentage > 0 && product.specialDiscountPercentage > 0) {
          subtotal += ((product.sellingPrice) - (product.sellingPrice * ((product.discountPercentage / 100) + (product.specialDiscountPercentage / 100)))) * product.quantity;
          // return subtotal;
        } else {
          if (product.discountPercentage > 0) {
            subtotal += ((product.sellingPrice) - (product.sellingPrice * (product.discountPercentage / 100))) * product.quantity;
            // return subtotal;
          } else {
            if (product.specialDiscountPercentage > 0) {
              subtotal += ((product.sellingPrice) - (product.sellingPrice * (product.specialDiscountPercentage / 100))) * product.quantity;
              // return subtotal;
            } else {
              subtotal += product.sellingPrice * product.quantity;
              // return subtotal;
            }
          }
        }

      }
      return subtotal;
    }
    return subtotal;

  }

  public getTotalPrice() {
    let total = 0;
    // if (this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length > 0) {
    //   for (let product of this.embryoService.localStorageCartProducts) {
    //     total += (product.sellingPrice * product.quantity);
    //   }
    //   total += (this.embryoService.shipping + this.embryoService.tax);
    //   return total;
    // }
    // return total;
    if (this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length > 0) {
      for (let product of this.embryoService.localStorageCartProducts) {
        let price = 0;
        if (product.discountPercentage > 0 && product.specialDiscountPercentage > 0) {
          total += ((product.sellingPrice) - (product.sellingPrice * ((product.discountPercentage / 100) + (product.specialDiscountPercentage / 100)))) * product.quantity;
          // return total;
        } else {
          if (product.discountPercentage > 0) {
            total += ((product.sellingPrice) - (product.sellingPrice * (product.discountPercentage / 100))) * product.quantity;
            // return total;
          } else {
            if (product.specialDiscountPercentage > 0) {
              total += ((product.sellingPrice) - (product.sellingPrice * (product.specialDiscountPercentage / 100))) * product.quantity;
              // return total;
            } else {
              total += product.sellingPrice * product.quantity;
              // return total;
            }
          }
        }


      }
      return total;
    }
    return total;


  }

  public updateLocalCartProduct() {
    this.embryoService.updateAllLocalCartProduct(this.embryoService.localStorageCartProducts);
    let token = localStorage.getItem('token');
    let userData = JSON.parse(localStorage.getItem('userDetails'));
    console.log(userData);
    if (token == null) {
      console.log('token is null');
      let config = new MatSnackBarConfig();
      config.verticalPosition = this.verticalPosition;
      config.horizontalPosition = this.horizontalPosition;
      config.panelClass = ['custom-class1'];
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open('Please SignIn, before checkout', this.action ? this.actionButtonLabel : undefined, config);
      setTimeout(() => {
        this.embryoService.navigate('/session/signin', []);
      }, 2000);
    } else {
      console.log('got token', token);
      this.finalApiProducts = [];
      this.loaclfinalProducts = [];
      this.loaclfinalWishlistProducts = [];

      this.loaclfinalProducts = this.embryoService.localStorageCartProducts;

      console.log(this.loaclfinalProducts);

      this.loaclfinalProducts.forEach(element => {
        if (element.discountPercentage > 0) {
          let obj = {
            "productId": element.productId,
            // "customerId": userData.userId,
            "quantity": parseInt(element.quantity),
            "discountPercentage": element.discountPercentage,
            "discountAmount": 0
          }
          this.finalApiProducts.push(obj);
        } else {
          let obj = {
            "productId": element.productId,
            // "customerId": userData.userId,
            "quantity": parseInt(element.quantity),
            "discountPercentage": 0,
            "discountAmount": 0
          }
          this.finalApiProducts.push(obj);
        }


      });
      console.log(this.finalApiProducts);
      let obj = {
        // "customerId": userData.userId,
        "productDetails": this.finalApiProducts
      }
      console.log(obj);
      this.homeService.addToCart(obj).subscribe((data: any) => {
        if (data.isStatus == true) {
          console.log(data.response);
          this.homeService.viewcartitemsafterlogin().subscribe((data: any) => {
            if (data.isStatus == true) {
              localStorage.setItem("cart_item", JSON.stringify(data.response));
              console.log('setting to local', JSON.stringify(data.response))
              let cartProducts = this.embryoService.localStorageCartProducts;
              // console.log(cartProducts);
              this.embryoService.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item"));
              this.embryoService.navbarCartCount = this.embryoService.localStorageCartProducts.length;
            } else {
              console.log("getproducts after carttttttttttttt", data.response);
            }
          })
          this.homeService.addAndEditOrder().subscribe((data: any) => {
            if (data.isStatus == true) {
              console.log('order', data.response);

              this.router.navigate(['/checkout', { 'orderId': btoa(data.id) }]);
            } else {
              // this.router.navigate(['/checkout', { 'orderId': data.id }]);
            }
          })
        } else {
          console.log(data.response);
        }
      })

      this.loaclfinalWishlistProducts = this.embryoService.localStorageWishlist;
      this.loaclfinalWishlistProducts.forEach(element => {
        let obj = {
          "productId": element.productId,
          // "customerId": userData.userId,
          "quantity": parseInt(element.quantity)
        }
        this.finalApiWishListProducts.push(obj);
      });
      console.log(this.finalApiProducts);
      let obj1 = {
        // "customerId": userData.userId,
        "productDetails": this.finalApiWishListProducts
      }
      this.homeService.addToWishlist(obj1).subscribe((data: any) => {
        if (data.isStatus == true) {
          console.log(data.response);

        } else {
          console.log(data.response);
        }
      })
    }
  }

  public getQuantityValue(product) {
    if (product.quantity) {
      return product.quantity
    } else {
      return 1;
    }
  }
}
