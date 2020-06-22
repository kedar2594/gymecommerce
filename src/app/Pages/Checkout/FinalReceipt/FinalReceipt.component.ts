
import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import { PlatformLocation } from '@angular/common';
declare var $: any;
import { NavigationStart } from "@angular/router";
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-FinalReceipt',
  templateUrl: './FinalReceipt.component.html',
  styleUrls: ['./FinalReceipt.component.scss']
})

export class FinalReceiptComponent implements OnInit {
  details: any;
  deliveryDate: any;
  products: any;
  userDetails: any;
  todayDate: any = new Date();
  token: any;

  orderId: any;
  orderDetailslist: any;
  orderDetails: any;
  taxamount: any;
  windowScrolled: boolean;

  constructor(@Inject(DOCUMENT) private document: Document, private homeService: HomeTwoService, private route: ActivatedRoute,
    public embryoService: EmbryoService, public router: Router, private location: PlatformLocation) {
    this.getDeliveryDate();
    this.userDetails = JSON.parse(localStorage.getItem("user"));
    //akshatha

    // history.pushState(null, null, window.location.href);
    // this.location.onPopState(() => {

    // history.pushState(null, null, window.location.href);
    // });
    //   location.onPopState(() => {
    //     console.log('pressed back in add!!!!!');
    //     //this.router.navigateByUrl(‘/multicomponent’);
    //     //history.forward();
    // });

    this.token = localStorage.getItem('token');
    this.viewprofile();
    this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      console.log(this.orderId);
      this.getOrders(atob(this.orderId));
      router.events
        .pipe(
          // The "events" stream contains all the navigation events. For this demo,
          // though, we only care about the NavigationStart event as it contains
          // information about what initiated the navigation sequence.
          filter(
            (event: NavigationEvent) => {

              return (event instanceof NavigationStart);

            }
          )
        )
        .subscribe(
          (event: NavigationStart) => {

            console.group("NavigationStart Event");
            // Every navigation sequence is given a unique ID. Even "popstate"
            // navigations are really just "roll forward" navigations that get
            // a new, unique ID.
            console.log("navigation id:", event.id);
            console.log("route:", event.url);
            // The "navigationTrigger" will be one of:
            // --
            // - imperative (ie, user clicked a link).
            // - popstate (ie, browser controlled change such as Back button).
            // - hashchange
            // --
            // NOTE: I am not sure what triggers the "hashchange" type.
            console.log("trigger:", event.navigationTrigger);

            // This "restoredState" property is defined when the navigation
            // event is triggered by a "popstate" event (ex, back / forward
            // buttons). It will contain the ID of the earlier navigation event
            // to which the browser is returning.
            // --
            // CAUTION: This ID may not be part of the current page rendering.
            // This value is pulled out of the browser; and, may exist across
            // page refreshes.
            if (event.restoredState) {

              console.warn(
                "restoring navigation id:",
                event.restoredState.navigationId
              );

            }

            console.groupEnd();

          }
        )


    });



    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
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

    window.scrollTo(0, 0)
  }



  public getDeliveryDate() {
    this.deliveryDate = new Date();
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 5);
  }

  public calculateProductSinglePrice(product: any, value: any) {
    let price = 0;
    if (!value) {
      value = 1;
    }
    price = product.price * value;
    return price;
  }

  public calculateTotalPrice() {
    let subtotal = 0;
    if (this.embryoService.buyUserCartProducts && this.embryoService.buyUserCartProducts.length > 0) {
      for (let product of this.embryoService.buyUserCartProducts) {
        if (!product.quantity) {
          product.quantity = 1;
        }
        subtotal += (product.price * product.quantity);
      }
      return subtotal;
    }
    return subtotal;
  }

  public getTotalPrice() {
    let total = 0;
    if (this.embryoService.buyUserCartProducts && this.embryoService.buyUserCartProducts.length > 0) {
      for (let product of this.embryoService.buyUserCartProducts) {
        if (!product.quantity) {
          product.quantity = 1;
        }
        total += (product.price * product.quantity);
      }
      total += (this.embryoService.shipping + this.embryoService.tax);
      return total;
    }
    return total;
  }

  public goToHome() {
    this.embryoService.removeBuyProducts();
    this.router.navigate(['/']);
  }

  public printDiv() {
    var printContents = $($('#payment-receipt').html());
    var originalContents = $('body > *').hide();
    $('body').append(printContents);
    window.print();
    printContents.remove();
    originalContents.show();
  }

  //akshatha

  viewprofile() {
    this.homeService.viewprofiledetails().subscribe((data: any) => {
      if (data.isStatus == true) {
        console.log('profiledetailssssss', data.response);
        this.details = data.response;
      } else {
      }
    })
  }

  getOrders(orderId) {
    this.homeService.getOrderDetails(atob(this.orderId)).subscribe((data: any) => {
      if (data.isStatus == true) {
        this.orderDetailslist = data.response;
        this.taxamount = data.response.taxAmount;
        this.orderDetails = data.response.orderDetails;
        console.log('order details', this.orderDetailslist);
      }
    })
  }

  public correctprice(product) {
    let total = 0;
    console.log('correctpriceamount', product.prodductDetails.specialDiscount);
    if (product.prodductDetails.specialDiscount == null || product.prodductDetails.specialDiscount == undefined ||
      product.prodductDetails.specialDiscount == "") {

      total = ((product.prodductDetails.sellingPrice - 0) * product.quantity);
      console.log('correctpriceamountwithzero', total);
      return total;
    } else {
      total = ((product.prodductDetails.sellingPrice - product.prodductDetails.specialDiscount) * product.quantity);
      console.log('correctpriceamountwithoutzero', total);
      return total;

    }


  }

  public getTotalPriceAmout(product) {

    console.log('orderdeatilslistfortesting', product);
    let total = 0;
    console.log('correctpriceamount', product.prodductDetails.specialDiscount);
    if (product.prodductDetails.specialDiscount == null || product.prodductDetails.specialDiscount == undefined ||
      product.prodductDetails.specialDiscount == "") {

      total = (((product.prodductDetails.sellingPrice - 0) * product.quantity) + this.taxamount);
      console.log('correctpriceamountwithzero', total);
      return total;
    } else {
      total = (((product.prodductDetails.sellingPrice - product.prodductDetails.specialDiscount) * product.quantity) + this.taxamount);
      console.log('correctpriceamountwithoutzero', total);
      return total;

    }

  }

}
