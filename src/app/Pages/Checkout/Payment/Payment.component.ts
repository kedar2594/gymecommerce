import { WindowRefService } from './../../../window-ref.service';

import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { EmbryoService } from '../../../Services/Embryo.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import {
  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.scss'],
  providers: [WindowRefService]
})
export class PaymentComponent implements OnInit, AfterViewInit {

  userdetails: any = [];
  selectedAddress: any;
  showprimaryAddress: boolean = false;
  showshippingAddress: boolean = false;
  showOnlyshippingAddress: boolean = false;
  addShippinngAddress: FormGroup;
  addBillingAddress: FormGroup;
  addOnlyShippingAddress: FormGroup;
  showAddAddressBtn: boolean = false;
  step = 0;
  isDisabledPaymentStepTwo = true;
  isDisabledPaymentStepThree = false;

  durationInSeconds = 2;
  message: string = 'Fields marked with * are mandatory';
  actionButtonLabel: string = '';
  actionButtonLabel1: string;
  action: boolean = true;
  autoHide: number = 2000;
  setAutoHide: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  finalBillingAddress: any;
  finalShippingAddress: any;

  finalTotalAmount: any;
  orderDetails: any = [];
  emailPattern: any = /\S+@\S+\.\S+/;
  offerCards: any = [
    {
      id: 1,
      name: "Debit Card",
      content: "Visa Mega Shopping Offer"
    },
    {
      id: 2,
      name: "Credit Card",
      content: "American Express 20% Flat"
    },
    {
      id: 3,
      name: "Debit Card",
      content: "BOA Buy 1 Get One Offer"
    },
    {
      id: 4,
      name: "Master Card",
      content: "Mastercard Elite Card"
    },
    {
      id: 5,
      name: "Debit Card",
      content: "Visa Mega Shopping Offer"
    }
  ]

  bankCardsImages: any = [
    {
      id: 1,
      image: "assets/images/client-logo-1.png"
    },
    {
      id: 2,
      image: "assets/images/client-logo-2.png"
    },
    {
      id: 3,
      image: "assets/images/client-logo-3.png"
    },
    {
      id: 4,
      image: "assets/images/client-logo-4.png"
    },
    {
      id: 5,
      image: "assets/images/client-logo-5.png"
    }
  ]
  windowScrolled: boolean;
  paymentFormOne: FormGroup;
  orderId: any;
  token: string;
  orderIdPaymentgateway: any;
  apikey: any;
  totalamount: any;

  constructor(@Inject(DOCUMENT) private document: Document, private winRef: WindowRefService, private route: ActivatedRoute, public snackBar: MatSnackBar, private homeService: HomeTwoService, public embryoService: EmbryoService,
    private formGroup: FormBuilder,
    public router: Router) {
    this.getRazorpayapikey();
    this.token = localStorage.getItem('token');
    this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      console.log(atob(this.orderId));
      this.getOrders();
    });
    this.viewprofile();


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
    this.paymentFormOne = this.formGroup.group({
      user_details: this.formGroup.group({
        // first_name: ['', [Validators.required]],
        // last_name: ['', [Validators.required]],
        // street_name_number: ['', [Validators.required]],
        // apt: ['', [Validators.required]],
        // zip_code: ['', [Validators.required]],
        // city_state: ['', [Validators.required]],
        // country: ['', [Validators.required]],
        // mobile: ['', [Validators.required]],
        // email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        // share_email: ['', [Validators.pattern(this.emailPattern)]],
        selectedAddress: ['', [Validators.required]]
      }),
      offers: this.formGroup.group({
        discount_code: [''],
        // card_type: [1],
        // card_type_offer_name: [null]
      }),
      payment: this.formGroup.group({
        card_number: ['', [Validators.required]],
        user_card_name: ['', [Validators.required]],
        cvv: ['', [Validators.required]],
        expiry_date: ['', [Validators.required]],
        card_id: [1],
        bank_card_value: [null]
      })
    });

    this.addShippinngAddress = this.formGroup.group({
      shipaddress: ['', [Validators.required]],
      shipbuiding_name: ['', [Validators.required]],
      shipstreet_no: ['', [Validators.required]],
      shipcity: ['', [Validators.required]],
      shipstate: ['', [Validators.required]],
      shipzip_code: ['', [Validators.required]],
      shipcountry: ['', [Validators.required]],
    })

    this.addBillingAddress = this.formGroup.group({
      billaddress: ['', [Validators.required]],
      billbuiding_name: ['', [Validators.required]],
      billstreet_no: ['', [Validators.required]],
      billcity: ['', [Validators.required]],
      billstate: ['', [Validators.required]],
      billzip_code: ['', [Validators.required]],
      billcountry: ['', [Validators.required]],
      billcheckAddress: ['', [Validators.required]]
    })


    this.addOnlyShippingAddress = this.formGroup.group({
      shiponlyaddress: ['', [Validators.required]],
      shiponlybuiding_name: ['', [Validators.required]],
      shiponlystreet_no: ['', [Validators.required]],
      shiponlycity: ['', [Validators.required]],
      shiponlystate: ['', [Validators.required]],
      shiponlyzip_code: ['', [Validators.required]],
      shiponlycountry: ['', [Validators.required]],
    })

  }

  ngAfterViewInit() {
  }

  viewprofile() {
    this.homeService.viewprofiledetails().subscribe((data: any) => {
      if (data.isStatus == true) {
        console.log('profiledetailssssss', data.response);
        this.userdetails = data.response;
        console.log(this.userdetails);
      } else {
      }
    })
  }

  getOrders() {
    this.homeService.getOrderDetails(atob(this.orderId)).subscribe((data: any) => {
      if (data.isStatus == true) {
        this.orderDetails = data.response;
        console.log(this.orderDetails);
        this.totalamount = (this.orderDetails.taxAmount + this.orderDetails.totalAmount);
        this.totalamount = this.totalamount.toFixed(2);

      }
    })
  }

  addprimaryAddress() {
    this.showprimaryAddress = true;
  }

  addOnlyshippingAddress() {
    this.showOnlyshippingAddress = true;
  }

  getRadio($event) {
    console.log($event.value);
    if ($event.value == 'No') {
      this.showshippingAddress = true;
      this.showAddAddressBtn = false;
    } else {
      this.showshippingAddress = false;
      this.showAddAddressBtn = true;
    }

  }

  saveAddAddress() {

    if (this.addBillingAddress.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open('All fields are mandtory in billing information', this.action ? this.actionButtonLabel : undefined, config);
    } else {
      let saveAddAddress = this.addBillingAddress.value.billaddress + ',' + this.addBillingAddress.value.billbuiding_name + ',' + this.addBillingAddress.value.billstreet_no + ',' + this.addBillingAddress.value.billcity + ',' + this.addBillingAddress.value.billstate + ',' + this.addBillingAddress.value.billzip_code + ',' + this.addBillingAddress.value.billcountry
      console.log(saveAddAddress, this.addBillingAddress.value.billcheckAddress);
      if (this.addBillingAddress.value.billcheckAddress == 'Yes') {
        let obj = {
          "primaryAddress": saveAddAddress,
          "secondaryAddress": "",
          "shippingAddress": saveAddAddress
        }
        console.log('sameadd', obj);
        this.homeService.saveAddress(obj).subscribe((data: any) => {
          if (data.isStatus == true) {
            this.showprimaryAddress = false;
            this.showshippingAddress = false;
            let config = new MatSnackBarConfig();
            config.duration = this.setAutoHide ? this.autoHide : 0;
            this.snackBar.open('Address Saved Successfully', this.action ? this.actionButtonLabel : undefined, config);
            this.router.navigate(['/checkout/payment', { 'orderId': this.orderId }])
          } else {

          }
        })
      }
    }
  }

  saveAddShippingAddress() {
    console.log(this.addShippinngAddress)

    if (this.addShippinngAddress.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open('All fields are mandtory in shipping information', this.action ? this.actionButtonLabel : undefined, config);
    } else if (this.addBillingAddress.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open('All fields are mandtory in billing information', this.action ? this.actionButtonLabel : undefined, config);
    } else {
      let billingAddress = this.addBillingAddress.value.billaddress + ',' + this.addBillingAddress.value.billbuiding_name + ',' + this.addBillingAddress.value.billstreet_no + ',' + this.addBillingAddress.value.billcity + ',' + this.addBillingAddress.value.billstate + ',' + this.addBillingAddress.value.billzip_code + ',' + this.addBillingAddress.value.billcountry
      let shippingAddress = this.addShippinngAddress.value.shipaddress + ',' + this.addShippinngAddress.value.shipbuiding_name + ',' + this.addShippinngAddress.value.shipstreet_no + ',' + this.addShippinngAddress.value.shipcity + ',' + this.addShippinngAddress.value.shipstate + ',' + this.addShippinngAddress.value.shipzip_code + ',' + this.addShippinngAddress.value.shipcountry
      let obj = {
        "primaryAddress": billingAddress,
        "secondaryAddress": "",
        "shippingAddress": shippingAddress
      }
      console.log('diff', obj);
      this.homeService.saveAddress(obj).subscribe((data: any) => {
        if (data.isStatus == true) {
          this.showprimaryAddress = false;
          this.showshippingAddress = false;
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          this.snackBar.open('Address Saved Successfully', this.action ? this.actionButtonLabel : undefined, config);
          this.router.navigate(['/checkout/payment', { 'orderId': this.orderId }])
        } else {

        }
      })
    }
  }

  saveOnlyShippingAddress() {
    console.log(this.addOnlyShippingAddress)

    if (this.addOnlyShippingAddress.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open('All fields are mandtory in shipping information', this.action ? this.actionButtonLabel : undefined, config);
    } else {

      let shippingAddress = this.addOnlyShippingAddress.value.shiponlyaddress + ',' + this.addOnlyShippingAddress.value.shiponlybuiding_name + ',' + this.addOnlyShippingAddress.value.shiponlystreet_no + ',' + this.addOnlyShippingAddress.value.shiponlycity + ',' + this.addOnlyShippingAddress.value.shiponlystate + ',' + this.addOnlyShippingAddress.value.shiponlyzip_code + ',' + this.addOnlyShippingAddress.value.shiponlycountry
      let obj = {
        "primaryAddress": this.userdetails.primaryAddress,
        "secondaryAddress": "",
        "shippingAddress": shippingAddress
      }
      console.log('diff', obj);
      this.homeService.saveAddress(obj).subscribe((data: any) => {
        if (data.isStatus == true) {
          this.showprimaryAddress = false;
          this.showshippingAddress = false;
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          this.snackBar.open('Address Saved Successfully', this.action ? this.actionButtonLabel : undefined, config);
          this.router.navigate(['/checkout/payment', { 'orderId': this.orderId }])
        } else {

        }
      })
    }
  }

  radioValue($event) {
    console.log($event, this.selectedAddress);

  }
  public setStep(index: number) {
    this.step = index;
    switch (index) {
      case 0:
        this.isDisabledPaymentStepTwo = true;
        this.isDisabledPaymentStepThree = true;
        break;
      case 1:
        this.isDisabledPaymentStepThree = false;
        break;
      default:

        break;
    }
  }

  public toggleRightSidenav() {
    this.embryoService.paymentSidenavOpen = !this.embryoService.paymentSidenavOpen;
  }

  public getCartProducts() {
    let total = 0;
    if (this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length > 0) {
      for (let product of this.embryoService.localStorageCartProducts) {
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

  public submitPayment() {
    let userDetailsGroup = <FormGroup>(this.paymentFormOne.controls['user_details']);
    console.log(userDetailsGroup);

    if (userDetailsGroup.valid) {

      switch (this.step) {
        case 0:
          this.step = 1;
          this.isDisabledPaymentStepTwo = false;
          break;
        case 1:
          this.step = 2;
          break;

        default:
          // code...
          break;
      }
      if (userDetailsGroup.value.selectedAddress == 'billingAddress') {
        this.finalBillingAddress = this.userdetails.primaryAddress;
        this.finalShippingAddress = ""
      } else {
        this.finalShippingAddress = this.userdetails.shippingAddress;
        this.finalBillingAddress = ""
      }

      setTimeout(() => {
        this.homeService.UpdateAddressForOrder(atob(this.orderId), this.finalBillingAddress, this.finalShippingAddress).subscribe((data: any) => {
          if (data.isStatus == true) {
            console.log(data.response);
          }
        })
      }, 2000);

    } else {
      let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open('Please select any one as a Delivery Address', this.action ? this.actionButtonLabel : undefined, config);

      this.isDisabledPaymentStepTwo = true;
      this.isDisabledPaymentStepThree = true;
      for (let i in userDetailsGroup.controls) {
        userDetailsGroup.controls[i].markAsTouched();
      }
    }
  }

  submitCoupon() {
    let userCoupon = <FormGroup>(this.paymentFormOne.controls['offers']);
    console.log(userCoupon);
    this.homeService.applyCouponCode(atob(this.orderId), userCoupon.value.discount_code).subscribe((data: any) => {
      if (data.isStatus == true) {
        console.log(data.response);
        this.homeService.CalculateFinalAmount(atob(this.orderId)).subscribe((data: any) => {
          if (data.isStatus == true) {
            console.log(data.response);
            this.finalTotalAmount = data.response;
          }
        })
      } else {
        // this.homeService.CalculateFinalAmount().subscribe((data: any) => {
        //   if (data.isStatus == true) {
        //     console.log(data.response);
        //   }
        // })
      }
    })
    this.step = 2;
  }

  public selectedPaymentTabChange(value) {
    let paymentGroup = <FormGroup>(this.paymentFormOne.controls['payment']);

    paymentGroup.markAsUntouched();

    if (value && value.index == 1) {
      paymentGroup.controls['card_number'].clearValidators();
      paymentGroup.controls['user_card_name'].clearValidators();
      paymentGroup.controls['cvv'].clearValidators();
      paymentGroup.controls['expiry_date'].clearValidators();

      paymentGroup.controls['bank_card_value'].setValidators([Validators.required]);
    } else {

      paymentGroup.controls['card_number'].setValidators([Validators.required]);
      paymentGroup.controls['user_card_name'].setValidators([Validators.required]);
      paymentGroup.controls['cvv'].setValidators([Validators.required]);
      paymentGroup.controls['expiry_date'].setValidators([Validators.required]);

      paymentGroup.controls['bank_card_value'].clearValidators();
    }

    paymentGroup.controls['card_number'].updateValueAndValidity();
    paymentGroup.controls['user_card_name'].updateValueAndValidity();
    paymentGroup.controls['cvv'].updateValueAndValidity();
    paymentGroup.controls['expiry_date'].updateValueAndValidity();
    paymentGroup.controls['bank_card_value'].updateValueAndValidity();
  }

  public finalStep() {
    let paymentGroup = <FormGroup>(this.paymentFormOne.controls['payment']);
    if (paymentGroup.valid) {
      this.embryoService.addBuyUserDetails(this.paymentFormOne.value);
      this.router.navigate(['/checkout/final-receipt']);

    } else {
      for (let i in paymentGroup.controls) {
        paymentGroup.controls[i].markAsTouched();
      }
    }
  }



  //Razorpay implimentation


  getRazorpayapikey() {
    this.homeService.viewAPIKEY().subscribe((data: any) => {
      if (data.isStatus == true) {
        console.log('akshathadkresponsekey', data.response);
        this.apikey = data.response

      }
    })
  }

  redirectToRazorPay() {
    this.homeService.CalculateFinalAmount(atob(this.orderId)).subscribe((data: any) => {
      if (data.isStatus == true) {

        this.finalTotalAmount = data.response;
        this.orderIdPaymentgateway = data.id;
      }
      this.payWithRazor(data);
    })

  }

  payWithRazor(data) {

    this.finalTotalAmount = data.response;
    this.orderIdPaymentgateway = data.id;
    console.log('akshathadkresponse', data.response, data.id, this.apikey);

    const options: any = {
      key: this.apikey,
      amount: this.finalTotalAmount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '',  // product description
      image: '/assets/images/stayicon.png', // company logo or product image
      order_id: this.orderIdPaymentgateway, // order_id created by you in backend

      // callback_url:'/checkout/final-receipt',
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#ed1c24'
      }
    };


    options.handler = ((response, error) => {
      options.response = response;
      console.log('akshatharazor', response);
      console.log('akshatharazor123', options);


      let data = {
        "orderId": parseInt(atob(this.orderId)),
        "razorpay_order_id": response.razorpay_order_id,
        "razorpay_payment_id": response.razorpay_payment_id,
        "razorpay_signature": response.razorpay_signature
      }

      this.homeService.verificationofuser(data).subscribe((data: any) => {
        //window.location.href = '/checkout/blank'
        if (data.isStatus == true) {

          this.homeService.orderComplition(response.razorpay_payment_id, parseInt(atob(this.orderId))).subscribe((data: any) => {
            if (data.isStatus == true) {
              alert('payment is successfull');
              window.location.href = '/checkout/final-receipt;orderId=' + this.orderId;
            }

          })
        } else {

          alert('payment is unsuccessfull')
          window.location.href = '/checkout/payment;orderId=' + this.orderId;
        }

      })

      // if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {
      //   // redirect_url = '/you-owe-money.html';
      // } else {

      //   //this.router.navigate(['/checkout/final-receipt',{ 'orderId': this.orderId }]);
      //   // window.location.reload();
      //   window.location.href = '/checkout/final-receipt;orderId=' + this.orderId;
      // }

      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // this.router.navigate(['/checkout/payment',{ 'orderId':   this.orderId }])
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });

    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();

  }

}



