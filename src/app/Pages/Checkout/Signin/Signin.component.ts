import { OrdersComponent } from './../Orders/Orders.component';
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit, Inject, HostListener } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DOCUMENT } from "@angular/platform-browser";
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {
  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
@Component({
  selector: 'app-Signin',
  templateUrl: './Signin.component.html',
  styleUrls: ['./Signin.component.scss']
})



export class SigninComponent implements OnInit {
  ///snackbar june17/////
  durationInSeconds = 2;
  actionButtonLabel1: string;

  actionButtonLabel: string = '';
  action: boolean = true;
  autoHide: number = 2000;
  setAutoHide: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  ////june 17 snackbar////

  otpvalidation: boolean = false;
  otp: any;
  userAddressValidations: FormGroup;
  otpstatus: boolean = false;
  otpcontinue: boolean = false;
  public settings = {
    length: 4,
    numbersOnly: true,
    timer: 45,
  }
  windowScrolled: boolean;

  totalamount: any;

  orderId: any;
  orderDetails: any = [];
  cartProducts: any;
  popupResponse: any;



  constructor(
    public snackBar: MatSnackBar,

    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    public dialog: MatDialog, public homeSevice: HomeTwoService, private route: ActivatedRoute,
    private router: Router, public embryoService: EmbryoService) {


    localStorage.removeItem('cart_item');
    let cartProducts = (this.embryoService.localStorageCartProducts = null);
    this.embryoService.navbarCartCount = 0;
    // this.route.queryParams.subscribe(params => { this.orderId = params['orderId']; this.getOrders(); });
    this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      console.log(this.orderId);
      this.getOrders();
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    // window.location.reload();
    // let win = (window as any);
    // var urlParams = [];
    // window.location.search.replace("?", "").split("&").forEach(function (e, i) {
    //   var p = e.split("=");
    //   urlParams[p[0]] = p[1];
    // });

    // // We have all the params now -> you can access it by name
    // console.log(urlParams["loaded"]);

    // if (urlParams["loaded"]) { } else {

    //   let win = (window as any);
    //   win.location.search = '?loaded=1';
    //   //win.location.reload('?loaded=1');
    // }
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
    this.userAddressValidations = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]]
    });

  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
    //  console.log(event.path[0].value);
    // console.log(this.userAddressValidations.value.mobileNumber);
  }
  requestOtp() {
    if (this.userAddressValidations.value.mobileNumber.length == 10) {
      // this.otpstatus=true;
      // console.log(this.userAddressValidations.value.mobileNumber);
      // let token = localStorage.getItem('token');
      // console.log(token);
      // let obj={
      //   "token":token,
      //   "mobileNumber":this.userAddressValidations.value.mobileNumber
      // }
      // console.log(obj);
      this.homeSevice.requestOtp(this.userAddressValidations.value.mobileNumber).subscribe((data: any) => {
        if (data.isStatus == true) {
          let config = new MatSnackBarConfig();
          config.verticalPosition = this.verticalPosition;
          config.horizontalPosition = this.horizontalPosition;
          config.panelClass = ['custom-class1'];
          config.duration = this.setAutoHide ? this.autoHide : 0;
          console.log(data.response);
          this.snackBar.open('OTP Sent Successfully! ', this.action ? this.actionButtonLabel : undefined, config);

          this.otpstatus = true;

        } else {
          let config = new MatSnackBarConfig();
          config.verticalPosition = this.verticalPosition;
          config.horizontalPosition = this.horizontalPosition;
          config.panelClass = ['custom-class1'];
          config.duration = this.setAutoHide ? this.autoHide : 0;
          this.snackBar.open(data.response, this.action ? this.actionButtonLabel1 : undefined, config);
          this.otpstatus = false;

        }

      }
      )

    } else {
      console.log(this.userAddressValidations.value.mobileNumber);
      this.otpstatus = false;

    }
  }
  getOrders() {

    this.homeSevice.getOrderDetails(atob(this.orderId)).subscribe((data: any) => {
      if (data.isStatus == true) {
        this.orderDetails = data.response;
        console.log(this.orderDetails);
        this.totalamount = (this.orderDetails.taxAmount + this.orderDetails.totalAmount);
        this.totalamount = this.totalamount.toFixed(2);
      }
    })
  }

  public toggleRightSidenav() {
    this.embryoService.paymentSidenavOpen = !this.embryoService.paymentSidenavOpen;
  }

  openDialog() {
    const dialogRef = this.dialog.open(OrdersComponent, {

      data: this.orderDetails,

      width: '600px',
      maxHeight: 'calc(100vh - 90px)',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  public getCartProducts() {
    let total = 0;
    if (this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length > 0) {
      for (let product of this.embryoService.localStorageCartProducts) {
        let price = 0;
        if (product.discountPercentage > 0) {

          total += ((product.sellingPrice) - (product.sellingPrice * (product.discountPercentage / 100))) * product.quantity;
          // return subtotal;
        } else {

          total += (product.sellingPrice * product.quantity);
          // return subtotal;
        }
      }
      return total;
    }
    return total;
  }
  public calculateTotalPrice() {
    let subtotal = 0;
    if (this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length > 0) {
      for (let product of this.embryoService.localStorageCartProducts) {
        subtotal += (product.sellingPrice * product.quantity);
      }
    }
    return subtotal;
  }

  public removeProduct(value) {
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
      this.embryoService.paymentSidenavOpen = false;
    }
  }

  public calculateProductSinglePrice(product: any, value: any) {
    let price = 0;
    product.quantity = value;
    price = product.sellingPrice * value;
    return price;
  }

  public getTotalPrice() {
    let total = 0;
    if (this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length > 0) {
      for (let product of this.embryoService.localStorageCartProducts) {
        total += (product.sellingPrice * product.quantity);
      }
      total += (this.embryoService.shipping + this.embryoService.tax);
    }
    return total;
  }

  public closeSlider() {

    this.embryoService.paymentSidenavOpen = !this.embryoService.paymentSidenavOpen;

  }

  continuePayment() {
    //     console.log(this.otp);
    //     if(this.otp==0){
    // this.otpvalidation=true;
    //     }else{

    //       this.otpvalidation=false;

    //           this.homeSevice.validateotp(this.userAddressValidations.value.mobileNumber,this.otp).subscribe((data:any)=>
    //           {
    // if(data.isStatus==true){
    // console.log(data.response);
    //     this.router.navigate(['/checkout/payment', { 'orderId': this.orderId }])

    // }else{
    //   console.log(data.response);

    // }

    //           }
    //           )

    //     }
    this.router.navigate(['/checkout/payment', { 'orderId': this.orderId }])

  }
  public onInputChange(e) {
    console.log(e);
    if (e.length == this.settings.length) {
      this.otpcontinue = true;
      this.otp = e;
      this.otpvalidation = false;

      // e will emit values entered as otp and,
      console.log('otp is', e);
    } else if (e == -1) {
      // if e == -1, timer has stopped
      console.log(e, 'resend button enables');
    } else if (e == -2) {
      // e == -2, button click handle
      console.log('resend otp');
      this.requestOtp();

    } else if (e.length != this.settings.length) {
      this.otp = 0;
    }
  }


}
